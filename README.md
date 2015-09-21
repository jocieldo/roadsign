# roadsign
road sign svg editor



###道理标志牌编辑器

![界面预览](roadsign.jpg)


##道路标志牌json数据协议


##json格式如下

	{
		"type":  "P01",
		"texts": [
			{
				"text": "南京路",
				"x": 54,
				"y": 10，
				"size": 2
			}，
			{
				"text": "前方500m",
				"x": 100,
				"y": 80,
				"size": 1
			}
		],
		"signs"	[
			{
				"type": "A01",
				"x": 120,
				"y": 60,
			}，
			{
				"type": "G02",
				"x": 120,
				"y": 60,
				"road": "G2"
			}
		]
	}

type："P01"：蓝色底；"P02"：绿色底
texts：文字项数组
signs：标志项数组

文字项
text：文字；
x：坐标x
y：坐标y
size：尺寸

标志项
type：标志分类
x：坐标x
y：坐标y
其他标志属性项


##标志分类及数据格式

+ 标志是指牌中的图形部分，不包括文字和底框
+ 标志在牌中的位置是固定的，所以不需要提供位置坐标。


**指路标志**

>+  A01： 十字
  ![图片](signImage/f9f3ec55f1532579ce7b7e7817e1fd3a8bc094bf)

	{
		"type": "A01"
	}

----------
 
>+ A02：T字交叉
>![图片](signImage/d51cacd6019b36f21ca0056f6b729ea8fa1a5c07)

	{
		"type": "A02"
	}


----------
 >+ A03：
 >![图片](signImage/77f0c6810e395aa095f2e0622a5ce67b7301b7a5)
 
	{
		"type": "A03"
	}




>+ A04：
>![图片](signImage/daace4a2dd4d064621b9715a2e08ef5f6718b9cd)

	{
		"type": "A04"
	}

----------

 >+ A05:：
 >![图片](signImage/9feebb5481ea9f8e37022faf15394178822ea18e)

	{
		"type": "A05"
	}

----------

>+ A06：
>![图片](signImage/1c937948f1d30a622f33c8765b9857ec4f78c95e)

	{
		"type": "A06"
	}

----------
 
>+ A07：左中右箭头
  ![图片](signImage/3cb064f04afa1081e56241a465cecc4942afe5df)

	{
		"type": "A07"
	}

---
>+ A08： 左右箭头
>![图片](signImage/5d5fb32550984d831aeba007183d8bc5c2cfd2ef)

	{
		"type": "A08"
	}

----------
>+ A09：  环行交叉路口
>![图片](signImage/5b64a62f9526dfa823c3aa8be766bc152bc32eb0)

	{
		"type": "A09"
	}

----------
>+ A10：  公路编号环行交叉路口
>![图片](signImage/895f0f5f038e579ab718540b7988c75f2fa5cfe2)

	{
		"type": "A10",
		"leftRoad": "S212",
		"rightRoad": "S213"
	}

----------
>+ A11：  公路编号十字交叉
>![图片](signImage/1032fff2729831fd8be072b8301dc2e6e1d2bc48)

	{
		"type": "A11",
		"leftRoad": "G108",
		"rightRoad": "G108"
	}

----------
>+ A12：  公路编号十字交叉
>![图片](signImage/4984b95e0874d591a9237ad0c7a6f19f915fe0f6)

	{
		"type": "A12"
	}

----------
>+ A13:  环行交叉路口
>![图片](signImage/6c72eacd729551951665fa8789e7a0ea1f0974c9)

	{
		"type": "A13"
	}

----------
>+ A14:  交通路口预告
>![图片](signImage/31cd23a4adede0dbb8f368927174d5329c5dc42e)

	{
		"type": "A14"
	}

----------

>+ A15:  互通式立交
>![图片](signImage/eb921a5a3ba16a11832bc29ae3e851551e270631)

	{
		"type": "A15"
	}

----------
>+ A16:  互通式立交
>![图片](signImage/46eb41a5ed198ede8b03c26fa8221437ac098a4b)

	{
		"type": "A16"
	}

----------
 
 >+ A17: 互通式立交
 >![图片](signImage/1276be8133ed8049e158c4ee9694b3d4b79d4255)

	{
		"type": "A17"
	}

----------

>+ A18:  Y型交叉路口
>![图片](signImage/6f889afd79b480c3c8454aa4e3e01bb750275cfb)

	{
		"type": "A18"
	}

----------

>+ A19:  分叉处
>![图片](signImage/fc8c172fe496bcb7aac14d19d2727d53a758ce23)

	{
		"type": "A19"
	}

**方向标志**

>+ B01:  东
>![图片](signImage/c9e7e76919e5b6816f8b903cafdb2cad63d19b02)

	{
		"type": "B01"
	}

>+ B02：南
>![图片](signImage/9a88d6ae765bc673ef6ad8752cce124943558c60)

	{
		"type": "B02"
	}

>+ B03：西
>![图片](signImage/fea66fb8031bb616dcda9f8740642d333231c903)

	{
		"type": "B03"
	}

>+ B04：北
>![图片](signImage/44f64e90ee37a207fdb887d5f8df9dc6ecac9ffd)

	{
		"type": "B04"
	}

----------

**其他标志**

>+ Z01:  道路编号标志
>![图片](signImage/6587c4540ca233c71d53f60b80b3a39016c83c42)

	{
		"type": "Z01"
	}

