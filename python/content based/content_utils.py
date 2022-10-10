import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer

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