from calculation_dal import *
from calculation_utils import *

def calculate_similarity():
    new_rates = get_rates_for_previous_day()

    requests = {}    
    yesterday_datetime = datetime.datetime.utcnow() - datetime.timedelta(days = 1)
    yesterday = datetime.datetime(yesterday_datetime.year, yesterday_datetime.month, yesterday_datetime.day)

    for rate in new_rates: 
        for review in rate['reviews']:
            # if (review['createdAt'] == yesterday):
                if (rate['bookId'] in requests.keys()):
                    requests[rate['bookId']].append(review['user']['_id'])
                else:
                    print(review['user']['_id'])
                    requests[rate['bookId']] = [review['user']['_id']]   

    books_to_delete_similarities = [item['bookId'] for item in new_rates]
    delete_similarity_by_books(books_to_delete_similarities)

    new_similaritites = []

    for book in new_rates:
        books_to_compare = get_rates_by_users(requests[book['bookId']])

        book_reviews = change_scheme_user_rate(book)

        for other in books_to_compare:
            if other['bookId'] != book['bookId']:
                if any(other['bookId'] in item.values() and book['bookId'] in item.values() for item in new_similaritites):
                    continue

                scope = koef_pearson(book_reviews, other)
                similarity = {
                    'book1':book['bookId'],
                    'book2':other['bookId'],
                    'similarity':scope
                    }
                new_similaritites.append(similarity)

    insert_books_similarity(new_similaritites)
    return len(new_similaritites)
       

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
    user_reviews = get_rates_by_users([user_id])
    changed_user_reviews = {}

    book_similatity = {}
    for review in user_reviews:
        similarities = []
        changed_user_reviews.update(change_scheme_book_rate(review))
        similarity_dict = get_similarity_by_book(review['bookId'])
        for item in similarity_dict:
            similarities.append((item['similarity'], item['book1'] if item['book1'] != review['bookId'] else item['book2']))
            
        book_similatity.update({review['bookId'] : similarities})

    recommended_items = get_recommended_items(changed_user_reviews, book_similatity)[:number]
    
    bookIds_to_get = [item[1] for item in recommended_items]
    books = get_books_by_ids(bookIds_to_get)

    for book in books:
        book['similarityRate'] = [x for (x, y) in recommended_items if y == book['id']][0]
        book['id'] = str(book['id'])
        del(book['_id'])

    return books