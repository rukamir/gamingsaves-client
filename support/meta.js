export function createMetaTagsForSocial({ url, title, description }) {
  return [
    {
      hid: 'generaldescription',
      name: 'description',
      content: description
    },
    {
      hid: 'fburl',
      name: 'og:url',
      content: url
    },
    {
      hid: 'fbtype',
      name: 'og:type',
      content: `article`
    },
    {
      hid: 'fbtitle',
      name: 'og:title',
      content: title
    },
    {
      hid: 'fbdesc',
      name: 'og:description',
      content: description
    },
    {
      hid: 'twitcard',
      name: 'twitter:card',
      content: `summary_large_image`
    },
    {
      hid: 'twitsite',
      name: 'twitter:description',
      content: `@IncludeJimmy`
    },
    {
      hid: 'twit',
      name: 'twitter:title',
      content: title
    },
    {
      hid: 'twit',
      name: 'twitter:description',
      content: description
    }
  ]
}
