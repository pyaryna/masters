import pandas as pd
import numpy as np
from scipy.sparse import hstack
from sklearn import preprocessing
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split

from content_dal import *
from content_utils import *

def calculate_recomendations_by_book(book_id, number):    
    book_similarities = get_similarity_by_book(book_id)

    for item in book_similarities:
        print(str(item["book1"]) +" - "+ str(item["book2"]))

    similarities = []
    for item in book_similarities:
            similarities.append((item['similarity'], item['book1'] if item['book1'] != book_id else item['book2']))
            
    similarities.sort()
    similarities.reverse()
    similarities = similarities[:number]
    
    bookIds_to_get = [item[1] for item in similarities]
    books = get_books_by_ids(bookIds_to_get)

    for book in books:
        book['similarityRate'] = [x for (x, y) in similarities if y == book['id']][0]
        book['id'] = str(book['id'])
        del(book['_id'])

    return books


def calculate_recomendations_for_user(user_id, number):
    user_reviews = get_rates_by_user(user_id)

    rates_df = pd.DataFrame(user_reviews)
    rates_df.drop("_id", axis=1, inplace=True)

    books = get_books()
    books_df = pd.DataFrame(books)

    main_df = pd.merge(books_df, rates_df, how="left", left_on="_id", right_on="bookId")
    main_df.drop("bookId", axis=1, inplace=True)
    main_df.genres = [' '.join(map(str, l)) for l in main_df.genres]

    columns_to_join = ["title", "description", "genres"]
    main_df['full_desc'] = main_df[columns_to_join].T.agg(' '.join)
    main_df.drop(columns_to_join, axis=1, inplace=True)

    main_df["full_desc"] = main_df['full_desc'].apply(text_preprocess)
    label_encoder = preprocessing.LabelEncoder()
  
    main_df['author']= label_encoder.fit_transform(main_df['author'])

    mask_var = main_df['rate'].isnull()  
    main_df.sort_values('rate', inplace=True)

    test_amount = len(main_df[mask_var])

    data = transform(main_df["full_desc"])
    data = hstack((data,np.array(main_df['author'])[:,None]))

    model = GaussianNB()
    
    X_train, X_test, y_train, y_test = train_test_split(data, 
                                            main_df['rate'], test_size=test_amount,
                                            shuffle=False)

    trained_model = model.fit(X_train.toarray(), y_train)
    pred = trained_model.predict(X_test.toarray())
    
    bookIds_to_get = [item[1] for item in recommended_items]
    books = get_books_by_ids(bookIds_to_get)

    for book in books:
        book['similarityRate'] = [x for (x, y) in recommended_items if y == book['id']][0]
        book['id'] = str(book['id'])
        del(book['_id'])

    return books