import { useEffect } from 'react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { getConfig } from '@edx/frontend-platform';
import { appendBrowserTimezoneToUrl } from '../../utils';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

function HasComments() {
    const {
        courseId,
    } = useSelector(state => state.courseHome);


    const order_types = [
        { 'id': 1, 'key': '-rate', 'text': 'Puana Göre Azalan' },
        { 'id': 2, 'key': 'rate', 'text': 'Puana Göre Artan' },
        { 'id': 3, 'key': '-id', 'text': 'Yeniden Eskiye' },
        { 'id': 4, 'key': 'id', 'text': 'Eskiye Yeniden' }
    ]

    const comments = [
        { id: 1, text: "çok güzel ders", starNumber: "1", ownerName: "Serkan Özdemır", time: "1 dk önce" },
        { id: 2, text: "çok güzel ders2", starNumber: "4", ownerName: "Onur Güngör", time: "12 dk önce" }
    ]

    const avgData = {
        score: "5.0",
        avgIcon: "4",
        bar: {
            1: "50",
            2: "10",
            3: "20",
            4: "15",
            5: "15"
        }
    }
    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState("");

    const handleRateClick = (event) => {
        const rating = parseInt(event.target.getAttribute("data-rating"));
        setRate(rating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSaveClick = () => {
        saveComment(rate, comment);
    };

    const saveComment = (rate, comment) => {
        addComment({'rate':rate,'comment':comment})
        console.log(`Rate: ${rate}, Comment: ${comment}`);
    };

    useEffect(() => {
        addCommentStarColored();
        getComments();
    }, [])

    const getComments = async () => {
        let url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/comments/data`;
        // url = appendBrowserTimezoneToUrl(url);
        const { data } = await getAuthenticatedHttpClient().get(url);
        console.log("data", data)
    }
    const addComment = async (dataJson) => {
        let url = `${getConfig().LMS_BASE_URL}/courses/${courseId}/comments/addComment`;
        // url = appendBrowserTimezoneToUrl(url);
        const { data } = await getAuthenticatedHttpClient().post(url, dataJson);
        console.log("data", data)
    }

    const getStarRows = (starNumber) => {
        let starRows = [];

        for (let starIndex = 1; starIndex < 6; starIndex++) {
            if (starNumber >= starIndex) {
                starRows.push(<i className="st-icon-star-checked" aria-hidden="true" />);
            } else {
                starRows.push(<i className="st-icon-star" aria-hidden="true" />);
            }
        }
        return starRows;
    }


    const addCommentStarColored = () => {
        let stars = document.querySelectorAll(".reviewStars i");

        stars.forEach(item => {
            item.addEventListener('click', function () {
                let rating = this.getAttribute("data-rating");
                let input = document.getElementsByTagName("input");
                input.value = rating;
                return SetRatingStar(rating, stars);
            });
        });
    }

    function SetRatingStar(rating, stars) {
        let len = stars.length;
        console.log(rating);

        for (let i = 0; i < len; i++) {
            if (i < rating) {
                stars[i].classList.replace('smile-icon-star', 'smile-icon-star-checked');
            } else {
                stars[i].classList.replace('smile-icon-star-checked', 'smile-icon-star');
            }
        }

    };

    const postComment = () => {
        console.log("post ettm")
    }

    return (
        <div className="comments_header">
            <div class="d-flex pg-wrapper" style={{ width: "100%" }}>
                <div class="col-2 total-number-wrapper">
                    <span class="display-4 font-weight-bolder" style={{ fontSize: "64px", fontWeight: "bold" }}>{avgData.score}</span>
                    <div class="text-right" style={{ display: "flex", gap: "3px", paddingLeft: "14px", paddingTop: "10px" }}>
                        {getStarRows(avgData.avgIcon)}
                    </div>
                </div>

                <div class="flex-grow-1 col-10">
                    <div class="row align-items-center">
                        <div class="col-10">
                            <div class="progress" style={{ height: "8px" }}>
                                <div class="progress-bar" role="progressbar"
                                    style={{ width: `${avgData.bar[5]}%` }}
                                    aria-valuenow={avgData.bar[5]}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </div>
                        <div class="col-2 text-right">
                            {getStarRows(5)}
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-10">
                            <div class="progress" style={{ height: "8px" }}>
                                <div class="progress-bar" role="progressbar"
                                    style={{ width: `${avgData.bar[4]}%` }}
                                    aria-valuenow={avgData.bar[4]}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </div>
                        <div class="col-2 text-right">
                            {getStarRows(4)}
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-10">
                            <div class="progress" style={{ height: "8px" }}>
                                <div class="progress-bar" role="progressbar"
                                    style={{ width: `${avgData.bar[3]}%` }}
                                    aria-valuenow={avgData.bar[3]}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </div>
                        <div class="col-2 text-right">
                            {getStarRows(3)}
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-10">
                            <div class="progress" style={{ height: "8px" }}>
                                <div class="progress-bar" role="progressbar"
                                    style={{ width: `${avgData.bar[2]}%` }}
                                    aria-valuenow={avgData.bar[2]}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </div>
                        <div class="col-2 text-right">
                            {getStarRows(2)}
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-10">
                            <div class="progress" style={{ height: "8px" }}>
                                <div class="progress-bar" role="progressbar"
                                    style={{ width: `${avgData.bar[1]}%` }}
                                    aria-valuenow={avgData.bar[1]}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </div>
                        <div class="col-2 text-right">
                            {getStarRows(1)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="add_comment">
                <div className="add-comment-wrapper">
                    <b className="add-comment-title">Değerlendir</b>
                    <input id="inputField" type="hidden" name="rate" required />
                    <div className="reviewStars stars py-4">
                        <i
                            id="add-comment-star-1"
                            data-rating="1"
                            className={`smile-icon-star l-star ${rate >= 1 ? "selected" : ""}`}
                            aria-hidden="true"
                            onClick={handleRateClick}
                        ></i>
                        <i
                            id="add-comment-star-2"
                            data-rating="2"
                            className={`smile-icon-star l-star ${rate >= 2 ? "selected" : ""}`}
                            aria-hidden="true"
                            onClick={handleRateClick}
                        ></i>
                        <i
                            id="add-comment-star-3"
                            data-rating="3"
                            className={`smile-icon-star l-star ${rate >= 3 ? "selected" : ""}`}
                            aria-hidden="true"
                            onClick={handleRateClick}
                        ></i>
                        <i
                            id="add-comment-star-4"
                            data-rating="4"
                            className={`smile-icon-star l-star ${rate >= 4 ? "selected" : ""}`}
                            aria-hidden="true"
                            onClick={handleRateClick}
                        ></i>
                        <i
                            id="add-comment-star-5"
                            data-rating="5"
                            className={`smile-icon-star l-star ${rate >= 5 ? "selected" : ""}`}
                            aria-hidden="true"
                            onClick={handleRateClick}
                        ></i>
                    </div>
                    <div className="comment_box">
                        <textarea
                            name="comment"
                            rows="6"
                            placeholder="Yorumun (İsteğe Bağlı)"
                            value={comment}
                            onChange={handleCommentChange}
                        ></textarea>
                    </div>
                    <div className="comment_footer" style={{ flexDirection: "column", gap: "10px" }}>
                        <button className="comment_button" onClick={handleSaveClick}>
                            Kaydet
                        </button>
                    </div>
                </div>
            </div>

            <div className='title-with-dropdown'>
                <h5>Tüm Yorumlar</h5>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="comment_button-order dropdown-toggle">
                        Sırala <i className="icon-chevron-down"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="dropdown-menu">
                        {order_types.map(order => (
                            <Dropdown.Item id={order.id} key={order.key} href="#">{order.text}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className='comment-wrapper'>
                {comments && comments.map(comment => (
                    <div class="comment" key={comment.id}>
                        <div class="comment_content" style={{ width: "100%" }}>
                            <div class="star-and-name-row" style={{ justifyContent: "space-between" }}>
                                <div class="stars">
                                    {getStarRows(comment.starNumber)}
                                </div>
                                <h6 className='commentOwner'>{comment.ownerName}</h6>

                            </div>
                            <div class="message">
                                {comment.text}
                            </div>
                            <div class="comment-bottom">
                                <div class="date comment-date">{comment.time}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HasComments;

