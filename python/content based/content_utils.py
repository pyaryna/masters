import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

from sklearn import preprocessing
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

def initial_df_preprocess(dataframe):
    dataframe.genres = [' '.join(map(str, l)) for l in dataframe.genres]

    columns_to_join = ["title", "description", "genres"]
    dataframe['full_desc'] = dataframe[columns_to_join].T.agg(' '.join)
    dataframe.drop(columns_to_join, axis=1, inplace=True)

    dataframe["full_desc"] = dataframe['full_desc'].apply(text_preprocess)
    label_encoder = preprocessing.LabelEncoder()
  
    dataframe['author']= label_encoder.fit_transform(dataframe['author'])
    return dataframe


def text_preprocess(sample):
    # lower-casing
    lower_text = sample.lower()

    entry_no_punct = lower_text.translate(str.maketrans('', '', string.punctuation))

    # word-level tokenization
    words = word_tokenize(entry_no_punct)

    # stopwords removal
    stops = stopwords.words('english')
    clean = [word for word in words if word not in stops]

    ps = PorterStemmer()
    # using Porter stemmer to stem our sentence
    stemmed_list = [ps.stem(w) for w in clean]

    return ' '.join(stemmed_list)

def transform(text):
    cv_transf = CountVectorizer()
    tfidf_transf = TfidfTransformer()
    cv_transf.fit(text)
    cv_metrix = cv_transf.transform(text)
    tfidf_transf.fit(cv_metrix)
    result = tfidf_transf.transform(cv_metrix)
    return result