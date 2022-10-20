import { memo, FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "antd";

import "./Navigation.css";

const { Option } = Select;

const LanguageChanger: FC = memo(() => {
    const { i18n } = useTranslation();

    const changeLanguage = useCallback((value) => {
        i18n.changeLanguage(value);
    }, [i18n]);

    return (
        <div className="language-changer">
            <Select
            defaultValue="ua"
            bordered={false}
            onChange={changeLanguage}
        >
            <Option value="ua">
                UA
            </Option>
            <Option value="en">
                ENG
            </Option>
        </Select>
        </div>
    )
});

export default LanguageChanger;
