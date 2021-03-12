import * as c3  from 'c3';
let chart = c3.generate({
    bindto: '#chart',
    data: {
        type: 'donut',
        columns: [
            ['良い感じ', 20],
            ['ピンとこない', 80]  
        ]
    },
    donut: {
        title: 'TypeScriptの印象は？'
    }
});