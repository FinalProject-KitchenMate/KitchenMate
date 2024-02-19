import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

function DisqusComments({post}) {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const disqusConfig = {
        url: pageUrl,
        identifier: post.id,
        title: post.title
    }
    return (
        <DiscussionEmbed shortname="kitchen-mate" config={disqusConfig} />
    )
}
export default DisqusComments
