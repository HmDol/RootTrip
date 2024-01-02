# ✈️ RooTrip (나의 여행을 공유하는 여행용 SNS)

1. [소개](#소개)
2. [주요 기능](#주요-기능)
3. [커밋 규칙](#커밋-규칙)
4. [아키텍처](#아키텍처)
5. [팀원](#팀원)

<br />

## 소개

![rootrip_image](https://github.com/BangDori/RooTrip-Front/assets/44726494/f668ad36-c3dd-42c7-8d14-5e23433f85d5)

코로나 19로 인해 사람들의 일상과 여행 습관은 크게 달라졌습니다. 평범했던 여행이 꿈같은 일로 여겨지게 되면서, 많은 이들이 여행에 대한 갈망을 느끼기 시작했습니다. 이러한 변화 속에서, 지도와 상호작용하는 새로운 여행용 SNS 플랫폼을 선보이게 되었습니다. 사용자들은 자신의 여행 사진, 비디오, 이야기를 공유하며, 다른 이들의 여행 경험을 통해 새로운 목적지를 발견하고, 여행 팁을 얻을 수 있습니다. 🧳

우리의 목표는 여행에 대한 갈망을 해소하고, 사람들이 다시 세계를 탐험할 수 있도록 영감을 주는 것입니다. 이 플랫폼을 통해 소파에 앉아서 세계 각지의 아름다운 장소와 문화를 경험할 수 있으며, 여행 계획을 세울 때 유용한 정보를 얻을 수 있습니다.

[데모 영상](https://www.youtube.com/watch?v=hT1PIR0VkoY)을 통해 **RooTrip**을 확인하실 수 있습니다!

<br />

## 주요 기능

1. **여행 기록 및 공유**
   - 여행 중에 촬영한 사진과 함께 여행 일지를 작성하여 기록할 수 있습니다.
   - 기록된 여행 일지의 사진, 내용을 보고 다른 사용자는 원하는 액션을 취할 수 있습니다.
      * 좋아요, 저장등 사용자 인터렉티브
   - 다른 사용자가 기록한 여행 일지의 사진을 통해 여행 경로를 확인할 수 있습니다.

2. **MapBox 및 사진 메타데이터 활용**
   - MapBox를 활용한 커스텀 지도를 통해 사용자의 여행 일지의 시각적 효과의 긍정적 경험을 
     극대화합니다.
   - 사진의 메타데이터를 활용하여 자동으로 업로드된 사진의 위치정보를 가져와 사용자의 여행 
     경로를 지도에 표시할 수 있습니다. 

3. **GPT-4를 활용한 이미지 카테고리 분류**
   - 사용자가 업데이트한 이미지의 카테고리를 GPT-4를 이용하여 분류한 후에 저장합니다.

4. **머신러닝을 활용한 맞춤형 추천 시스템**
   - 사용자가 *취한 액션을 토대로 콘텐츠 기반 필터링을 거쳐 해당 사용자에게 맞춤형 게시글을 추천해줍니다.
       *저장, 자주본 게시글, 추천

<br />

## 커밋 규칙

| Emoji | Message          | Description                                                      |
| :---: | ---------------- | ---------------------------------------------------------------- |
|  ✨   | Feat             | 새로운 기능 추가, 기존 기능을 요구 사항에 맞추어 수정               |
|   🛠   | Fix              | 기능에 대한 버그를 고친 경우                                      |
|  🎨   | Design           | 사용자 UI 디자인 변경                                             |
|   ⚠   | !BREAKING_CHANGE | 커다란 API 변경                                                  |
|  ❗   | !HOTFIX          | 긴급 수정                                                        |
|  🩹   | Style            | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우, 오타 수정     |
|   ⚖   | Refactor         | 프로덕션 코드 리팩토링                                            |
|  📃   | Docs             | 문서 수정                                                        |
|  📚   | Chore            | 패키지 매니저 혹은 설정 파일 수정                                  |
|  📂   | Rename           | 파일 혹은 폴더명을 수정하거나 옮긴 경우                            |
|   🗑   | Remove           | 파일을 삭제하는 경우                                              |
|  🎊   | Release          | 버전 릴리즈                                                      |
|  🔀   | Branch           | 브랜치 추가 및 병합                                              |

<br />

## ♾아키텍처

![image](https://github.com/BangDori/RooTrip-Front/assets/44726494/8766e290-a321-4fd7-b12f-6702401f0b75)

<br />

## 팀원

|      이름     |      역할     |     주소      |
| ------------- | ------------- | ------------- |
| 김힘찬 | 🛠 PM | [Github](https://github.com/HmDol) |
| 강병준 | 🌞 FE | [Github](https://github.com/BangDori) |
| 정문규 | 🌞 FE | [Github](https://github.com/JungMunGyu) |
| 우재민 | 🌚 BE | [Github](https://github.com/WooJJam) |
| 이영수 | 🌚 BE | [Github](https://github.com/youngsu5582) |

📋 [Notion](https://www.notion.so/e0bed146cc4c4280b7c5a05f4df22b90?v=975aa4fe34d6456e9ca84e4fd59690d6), [Figma](https://www.figma.com/file/rUpCTXuQRM4LS9ruN3ydZq/RooTrip_Backup?type=design&node-id=0%3A1&mode=design&t=uE2NIHnA0d43WzNv-1)
<br/> 🌞 Address: [RooTrip-FE](https://github.com/BangDori/RooTrip-Front)
<br/> 🌚 Address: [RooTrip-BE](https://github.com/youngsu5582/RooTrip-Backend)
