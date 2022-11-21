import { memo, FC } from "react";

import RecommendationPage from "../../components/Book/Recommendation/RecommendationPage";

import { getCollabRecomForUser } from "../../api/CollaborativeApi";

import "./Home.css";

const Collaborative: FC = memo(() => {
    return (
        <RecommendationPage getRecommendations={getCollabRecomForUser} />
    );
});

export default Collaborative;
