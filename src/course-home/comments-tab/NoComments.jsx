import { useState } from 'react';

import NoCommentsImg from "./assets/img/no-comment.png";

function NoComments() {

    return (
        <div>
            <div class="no-comment-wrapper">
                <img class="no-comment-img" src={NoCommentsImg} alt="My Open edX Home" />
                <strong>Bu programa ait bir yorum bulunmuyor.</strong>
            </div>
            <div class="starts-rating-wrapper" style={{ paddingTop: "20px" }}>
                <div class="reviewStars stars" style={{ gap: "8px", display: "flex", alignContent: "center", justifyContent: "center" }}>
                    <i data-rating="1" class="smile-icon-star" aria-hidden="true"></i>
                    <i data-rating="2" class="smile-icon-star" aria-hidden="true"></i>
                    <i data-rating="3" class="smile-icon-star" aria-hidden="true"></i>
                    <i data-rating="4" class="smile-icon-star" aria-hidden="true"></i>
                    <i data-rating="5" class="smile-icon-star" aria-hidden="true"></i>
                </div>
            </div>
            <div class="comment_wrapper">
                <div class="add_comment" style={{ paddingLeft: "20px !important" }}>
                    <input type="hidden" name="rate" required />
                    <div class="comment_box" style={{ paddingBottom: "0px", display: "inline-block", width: "450px" }}>
                        <div class="header">
                            <b>Yorum yap (İsteğe bağlı)</b>
                        </div>
                        <textarea name="comment" rows="6" placeholder="Yorumun"></textarea>
                    </div>
                    <div class="comment_footer">
                        <button class="comment_button" type="submit">Kaydet</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoComments;

