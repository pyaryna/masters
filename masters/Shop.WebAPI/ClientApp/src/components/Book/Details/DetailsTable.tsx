import { FC, memo } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "antd";
import moment from "moment";

import { IBook } from "../../../types/IBook";

import "./DetailsTable.css"

const { Panel } = Collapse;

interface IDetailsTableProps {
    book: IBook
}

const DetailsTable: FC<IDetailsTableProps> = memo(({ book }: IDetailsTableProps) => {
    return (
        <div className="details-table">
            <Collapse
                ghost
            >
                <Panel header="Book details" key="1">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Publisher
                                </td>
                                <td>
                                    <div className="book-publisher">
                                        <Link to="/">
                                            {book?.publisher.name}
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Genres
                                </td>
                                <td>
                                    {book?.genres.map(g =>
                                        <div key={g.id} className="book-genre">
                                            <Link to="/">
                                                {g.name}
                                            </Link>
                                            <br />
                                        </div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Language
                                </td>
                                <td>
                                    {book?.language}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Page count
                                </td>
                                <td>
                                    {book?.pageCount}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    ISBN
                                </td>
                                <td>
                                    {book?.isbn}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Published date
                                </td>
                                <td>
                                    {moment(book.publishedDate).format('MM/DD/YYYY')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Panel>
            </Collapse>
        </div>
    );
});

export default DetailsTable;
