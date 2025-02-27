import { IKImage } from 'imagekitio-react'
import React from 'react'

export default function Images({path,className,width,height,alt}) {
  return (
    <IKImage 
    urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT }
    path={path}
    className={className} 
    loading='lazy'
    lqip={{ active: true, quality: 80 }}
    width={width}
    height={height}
    transformation={[
      {
        width: width,   
        height: height,
      },
    ]}
    alt={alt}
    />
  )
}
