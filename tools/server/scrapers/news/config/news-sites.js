export default {
    WEBSITES: [
        {
            url: 'https://www.wealthmorning.com/category/stock-market/nz-stock-market/',
            selector: '.post',
            getText: html => {
                return html.find('.entry-title').text()
            },
            getLink: html => {
                return html.find('.entry-title a').attr('href')
            },
            getDate: html => {
                return html.find('.post-date').text()
            }
        },
        // {
        //     url: 'https://www.scoop.co.nz/news/business.html',
        //     selector: '.article-sections a'
        // },
        // {
        //     url: 'http://www.voxy.co.nz/business?page=1',
        //     selector: '.node a'
        // },
        // {
        //     url: 'https://www.stuff.co.nz/business',
        //     selector: '.it-article-headline a'
        // },
        {
            url: 'https://www.interest.co.nz/business',
            stripPath: '/business',
            selector: '.views-row',
            getDate: html => {
                return html.find('.views-field-published-at').text()
            },
            getText: html => {
                return html.find('.views-field-field-short-headline').text()
            },
            getLink: html => {
                return html.find('a').attr('href')
            }
        },
        // {
        //     url: 'https://www.nzherald.co.nz/tags/markets/62/',
        //     selector: '.headline',
        //     getLink: html => {
        //         return html.find('a').attr('href')
        //     },
        //     getDate: html => {
        //         return html.siblings('.publish').text()
        //     }
        // },
        // {
        //     url: 'https://www.goodreturns.co.nz/shares.html',
        //     selector: '.content > h4',
        //     getLink: html => {
        //         return html.find('a').attr('href')
        //     }
        // },
        // {
        //     url: 'https://businessdesk.co.nz/listed-companies',
        //     selector: '.headline-link',
        //     getText: html => {
        //
        //         return html.find('h3').text().replace(/\n/g, '').trim()
        //     }
        // }
    ]
};
