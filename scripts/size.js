 const getSize = require('size-limit')
 const path = require('path')

 const index = path.join(__dirname, '../build/index.js')
//  const extra = path.join(__dirname, 'extra.js')

 getSize([index]).then(size => {
   if (size.gzip > 1 * 1024 * 1024) {
     console.error('Project become bigger than 1MB')
   }
   console.log(size.gzip / 1024, 'KB')
 })

