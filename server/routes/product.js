
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

// FileUpload 시  사용되는 API
 // 저장공간 지정
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
 //저장 하기
var upload = multer({ storage: storage }).single("file")


//=================================
//            Product
//=================================

router.post("/uploadImage", (req, res) => {

    // 가져온 이미지를 저장
  upload(req, res, err => {
      if (err) {
          return res.json({ success: false, err})
          }
          return res.json({success: true, filePath: res.req.file.path, fileName:res.req.file.filename })
      // 백앤드에서 프론트로 보내는 정보

    })
  })

router.post("/", (req, res) => {

  // 상품 모델 을 DB 에 저장
  const product = new Product(req.body) // 프로덕트라는 스키마 모델안에 
                          // 프런트에서 post된 (body) 를 요청한다. 
                          // 새로운 변수 product에 저장한다
  console.log(product.body)

  product.save((err => {
    // product.save() 는 Product 에 body 의 모든 내용 저장한다
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200). json({ success: true })  
    
  }))
}); 


router.post("/products", (req, res) => {

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let findArgs = {}; // 필터를 위해 추가.. 오브잭트를 만들어준다

  for(let key in req.body.filters) {  // 필터에 들어있는 컨티넌츠나 프라이스에 의해

    if(req.body.filters[key].length > 0) {  // 필터에 선택된게 0개가 아닌 1개 이상이면
      findArgs[key] = req.body.filters[key]; // findArgs에 넣어주고 아래 find 에 넣어준다
    } 
  }

  console.log('파인아규', findArgs)
  

  Product.find(findArgs)
   //  product.find() 는 product 콜렐션에 (DB) 있는 상품 모델 을 가져오기    
    .populate("writer")
    // writer의 모든 정보를 가져오는 것
    .skip(skip)
    .limit(limit)
  
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({success: false, err}) 
      return res.status(200).json({
              success: true, productInfo,
              postSize: productInfo.length
      })
      // postSize 에 대한 설명
      //  [ {}, {}, {} ] 프로젝트 인포에(어레이) 3개의 데이터가 있으면
      // 아래와 같이  .lenght 를 통해서 3을 가져올수 있다. 4개의 데이터가 있으면 4를
      //  productInfo.length === 3 
      
      //  [ {}, {}, {}, {} ]  4개의 데이터가 있으면 4를
      //  productInfo.length === 4 
    })
}); 





module.exports = router;


