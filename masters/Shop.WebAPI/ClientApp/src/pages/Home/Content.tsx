import { memo, FC } from "react";

import RecommendationPage from "../../components/Book/Recommendation/RecommendationPage";

import { getContentRecomForUser } from "../../api/ContentApi";

import "./Home.css";

const Content: FC = memo(() => {
    return (
        <RecommendationPage getRecommendations={getContentRecomForUser} />
    );
});

export default Content;
