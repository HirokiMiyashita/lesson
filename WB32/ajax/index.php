<?php
    header("Content-type:application/xml; charset=UTF-8");
    $url = 'https://news.yahoo.co.jp/pickup/rss.xml';
    $xml = file_get_contents($url);
    print $xml;
?>
