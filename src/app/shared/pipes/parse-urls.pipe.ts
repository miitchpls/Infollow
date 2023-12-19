import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseUrls'
})

export class ParseUrlsPipe implements PipeTransform {

  urls: any = /(\b(https?|http|ftp|ftps|Https|rtsp|Rtsp):\/\/[A-Z0-9+&@#\/%?=~_|!:,.;-]*[-A-Z0-9+&@#\/%=~_|])/gim;
  hashtags: any = /(^|\s)(#[a-z\d][\w-.]*)/ig;
  mentions: any = /(^|\s)(@[a-z\d][\w-.]*)/ig;
  emails: any = /(\S+@\S+\.[a-z]+)/gim;

  private parseUrl(text: string) {
    if (text.match(this.urls)) {
      text = text.replace(this.urls, function replacer($1, $2, $3) {
        let url: any = $1;
        let urlClean: any = url.replace("" + $3 + "://", "");

        return "<a href=\"" + url + "\" target=\"_blank\">" + urlClean + "</a>";
      });
    }
    if (text.match(this.hashtags)) {
      text = text.replace(this.hashtags, "<a href=\"/$2\" class=\"hashtag-link\">$1$2</a>");
      text = text.replaceAll("href=\"/#", "href=\"/");
    }
    if (text.match(this.mentions)) {
      text = text.replace(this.mentions, "<a href=\"/$2\" class=\"handle-link\">$1$2</a>");
      text = text.replaceAll("href=\"/@", "href=\"/");
    }
    if (text.match(this.emails)) {
      text = text.replace(this.emails, "<a href=\"mailto:$1\">$1</a>");
    }
    return text;
  }

  transform(text: string) {
    text = text.replace(/\n/g, '<br/> ');
    return this.parseUrl(text);
  }
}
