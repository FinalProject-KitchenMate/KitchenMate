'use client'
import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

export interface Result {
    id: number;
    title: string;
    image: string;
    imageType: string;
}
function DisqusComments({recipt} : {recipt: Result}) {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const disqusConfig = {
        url: pageUrl,
        identifier: recipt.id.toString(),
        title: recipt.title
    }
    console.log(disqusConfig, "client disqus config");
    return (
            <DiscussionEmbed shortname="kitchenmate" config={disqusConfig} />
    )
}
export default DisqusComments
