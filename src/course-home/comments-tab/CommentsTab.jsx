import { useState } from 'react';

import NoComments from './NoComments';
import HasComments from './HasComments';

function CommentTab() {

    const [hasAnyComment, setHasAnyComment] = useState(true);

    return (
        <div class="comment_wrapper">
            {hasAnyComment ?
                <HasComments />
                :
                <NoComments />
            }
        </div>
    );
}

export default CommentTab;

