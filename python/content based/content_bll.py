import pandas as pd
import numpy as np
from scipy.sparse import hstack
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity

from content_dal import *
from content_utils import *

def calculate_recomendations_by_book(book_id, number, user_id):    
    book = get_book_by_id(book_id)

    if (user_id != None):
        user_rates = get_rates_by_user(user_id)
        bookdIds = [rate["bookId"] for rate in user_rates]
        bookdIds.append(book["_id"])
        books = get_books_not_in_ids(bookdIds)
    else:
        books = get_books_not_in_ids([book_id])

    books.insert(0, book)
    books_df = pd.DataFrame(books)

    books_df = initial_df_preprocess(books_df)

    data = transform(books_df["full_desc"])
    data = hstack((data,np.array(books_df['author'])[:,None]))
    
    result = cosine_similarity(data, [data.toarray()[0]])
    mask = books_df["_id"] != book_id
    result_df = pd.DataFrame()
    result_df["id"] = books_df[mask]["_id"]
    result_df["similarity"] = result[1:]

    result_df.sort_values('similarity', ascending=False, inplace=True)
    bookIds_to_get = result_df["id"].head(number).tolist()
    books = get_books_by_ids(bookIds_to_get)

    for book in books:
        book['similarityRate'] = round(result_df[result_df["id"] == book['id']]["similarity"].values[0], 4)
        book['id'] = str(book['id'])
        del(book['_id'])

    books = sorted(books, key=lambda d: d['similarityRate'], reverse=True)

    return books


def calculate_recomendations_for_user(user_id, number):
    user_reviews = get_rates_by_user(user_id)

    rates_df = pd.DataFrame(user_reviews)
    rates_df.drop("_id", axis=1, inplace=True)

    books = get_books()
    books_df = pd.DataFrame(books)

    main_df = pd.merge(books_df, rates_df, how="left", left_on="_id", right_on="bookId")
    main_df.drop("bookId", axis=1, inplace=True)
    main_df = initial_df_preprocess(main_df)

    main_df.sort_values('rate', inplace=True)
    mask = main_df.index.isin(main_df.index.values) & main_df.rate.isnull()

    test_amount = len(main_df[mask])

    data = transform(main_df["full_desc"])
    data = hstack((data,np.array(main_df['author'])[:,None]))

    model = GaussianNB()
    
    X_train, X_test, y_train, y_test = train_test_split(data, 
                                            main_df['rate'], test_size=test_amount,
                                            shuffle=False)

    trained_model = model.fit(X_train.toarray(), y_train)
    pred = trained_model.predict(X_test.toarray())

    recommended_items = pd.DataFrame()
    recommended_items["id"] = main_df[mask]["_id"]
    recommended_items["expected_rate"] = pred
    recommended_items.sort_values('expected_rate', ascending=False, inplace=True)
    bookIds_to_get = recommended_items["id"].head(number).tolist()
    books = get_books_by_ids(bookIds_to_get)

    for book in books:
        book['similarityRate'] = recommended_items[recommended_items["id"] == book['id']]["expected_rate"].values[0]
        book['id'] = str(book['id'])
        del(book['_id'])

    books = sorted(books, key=lambda d: d['similarityRate'], reverse=True)

    return books