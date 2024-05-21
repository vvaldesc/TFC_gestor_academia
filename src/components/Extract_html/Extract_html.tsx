import createCache from '@emotion/cache'
import * as ReactDOMServer from 'react-dom/server'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'

export const extractEmotionCssAndJs = (component: () => React.ReactNode) => {
  const cache = createCache({ key: 'mui-emotion-cache' })
  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

  /*const html = ReactDOMServer.renderToString(
    <CacheProvider value={cache}>
      {component()}
    </CacheProvider>,
  )*/

  const html = ReactDOMServer.renderToStaticMarkup(
    <CacheProvider value={cache}>
      {component()}
    </CacheProvider>,
  )

  const emotionChunks = extractCriticalToChunks(html)
  const emotionCss = constructStyleTagsFromChunks(emotionChunks)
  
  // console.log(emotionCss)
  console.log(emotionCss)

  return `${emotionCss} ${html}`
}