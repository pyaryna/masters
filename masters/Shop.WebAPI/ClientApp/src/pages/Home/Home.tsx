import { memo, FC, useState, useCallback, useEffect } from "react";
import { Image } from "antd";

import "./Home.css";
import { IBook } from "../../types/IBook";
import { getAllBooks } from "../../api/BookApi";

const Home: FC = memo(() => {
    const [books, setBooks] = useState<IBook[]>();

    const fetchBooks = useCallback(() => {
        getAllBooks()
          .then((response: { data: IBook[] }) => {
            setBooks(response.data);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }, [setBooks]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <div>

        </div>
    );
});

export default Home;
