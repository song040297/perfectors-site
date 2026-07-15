퍼펙터즈 - 실시간 글쓰기(Decap CMS) 설치 안내
================================================

이 폴더는 기존 사이트와 겉모습은 똑같지만, 안에서 "틀"과 "글 내용"이
분리된 구조예요. 이렇게 하면 /admin 페이지에서 폼을 채워 글을 쓰면
사이트가 자동으로 다시 만들어져요.

아래 순서대로만 하시면 돼요. 코드를 직접 만지는 부분은 없고,
전부 웹 화면에서 클릭하고 계정을 만드는 작업이에요.


[1단계] GitHub에 이 폴더 올리기
------------------------------------------------------
1. https://github.com 에서 무료 계정 만들기 (이미 giscus용으로 만드셨다면 그걸 쓰세요)
2. 오른쪽 위 "+" → "New repository" 클릭
3. 이름은 아무거나 (예: perfectors-site), Public으로 설정 → "Create repository"
4. 만들어진 빈 저장소 화면에서 "uploading an existing file" 링크 클릭
   (또는 "Add file" → "Upload files")
5. 압축을 푼 이 폴더 안의 내용물 전체(폴더 포함)를 그 화면에 드래그
   ⚠️ 폴더 안의 "내용물"을 올려야 해요 (perfectors-cms 폴더 자체가 아니라
   그 안에 있는 index.njk, package.json 등 파일/폴더들이 저장소 최상위에
   있어야 해요)
6. 아래로 스크롤해서 "Commit changes" 클릭


[2단계] 기존 Netlify 사이트를 이 저장소와 연결하기
------------------------------------------------------
지금 쓰고 계신 https://perfectors.netlify.app 주소를 그대로 유지하면서
연결할 수 있어요.

1. https://app.netlify.com 로그인 → 지금 사이트(perfectors) 클릭
2. "Site configuration" → "Build & deploy" → "Continuous deployment" 메뉴로 이동
3. "Link repository" (또는 "Link site to Git") 버튼 클릭
4. GitHub 인증 후, 1단계에서 만든 저장소 선택
5. Build settings는 자동으로 채워질 거예요 (netlify.toml 파일 덕분이에요).
   혹시 비어있다면:
   - Build command: npx @11ty/eleventy
   - Publish directory: _site
6. "Deploy" 클릭

몇 분 기다리면 빌드 로그가 뜨고, 끝나면 사이트가 새 구조로 업데이트돼요.
같은 주소(perfectors.netlify.app)를 그대로 써요.

⚠️ 만약 빌드 중 에러가 나면(빨간 글씨), 그 로그 내용을 통째로 복사해서
저한테 보여주세요. 바로 고쳐드릴게요.


[3단계] 로그인 기능 켜기 (Netlify Identity)
------------------------------------------------------
1. 같은 사이트 화면에서 "Site configuration" → "Identity" 로 이동
2. "Enable Identity" 클릭
3. 아래 "Registration preferences"에서 "Invite only"로 설정
   (아무나 가입해서 글을 쓸 수 없도록 막는 설정이에요)
4. "Services" 섹션에서 "Git Gateway" 찾아서 "Enable Git Gateway" 클릭


[4단계] 나 자신을 관리자로 초대하기
------------------------------------------------------
1. 같은 Identity 화면에서 "Invite users" 클릭
2. 본인 이메일 주소 입력 후 전송
3. 메일함 확인 → "Accept the invite" 메일 열어서 링크 클릭
4. 사이트로 이동하면서 비밀번호 설정 창이 떠요. 원하는 비밀번호로 설정


[5단계] 글쓰기 화면 들어가기
------------------------------------------------------
1. https://perfectors.netlify.app/admin/ 접속
2. 방금 설정한 이메일/비밀번호로 로그인
3. "글" 메뉴 → "New 글" 버튼으로 새 글 작성
4. 제목, 게임 이름, 분류, 난이도, 본문을 채우고 오른쪽 위 "Publish" 클릭
5. 약 30초~1분 기다리면 실제 사이트(https://perfectors.netlify.app)에
   새 글이 올라와 있어요. (Netlify가 자동으로 다시 빌드하기 때문이에요.
   Netlify 대시보드의 "Deploys" 탭에서 진행 상황을 볼 수 있어요.)


[본문에서 쓸 수 있는 서식]
------------------------------------------------------
- ## 소제목 → 큰 소제목 (자동으로 목차에 들어가요)
- ### 소제목 → 작은 소제목 (자동으로 목차에 들어가요)
- 일반 하이픈(-) 목록, 숫자 목록도 그대로 지원돼요
- 팁 박스를 넣고 싶으면:

  ::: tip
  여기에 팁 내용을 적어주세요.
  :::

- 사진은 본문 편집창의 이미지 삽입 버튼으로 바로 올릴 수 있어요
  (자동으로 assets/images/uploads 폴더에 저장돼요)


[댓글(giscus) 연결]
------------------------------------------------------
이전에 giscus.app에서 발급받은 코드가 있다면, 그 코드에서
아래 4가지 값만 뽑아 _data/giscus.json 파일에 채워 넣어주세요.

{
  "repo": "본인아이디/저장소이름",
  "repoId": "발급받은 repo-id 값",
  "category": "발급받은 category 값 (보통 Announcements)",
  "categoryId": "발급받은 category-id 값"
}

이 파일 하나만 고치고 GitHub에 다시 커밋하면, 모든 글에
자동으로 댓글창이 나타나요. (직접 GitHub 웹 화면에서 파일을
열어 연필 아이콘으로 수정 → 커밋하면 돼요.)


[이제부터 새 글은 이렇게]
------------------------------------------------------
1. https://perfectors.netlify.app/admin/ 접속 후 로그인
2. "New 글" 클릭 → 작성 → Publish
3. 끝! 더 이상 저한테 파일을 받아서 업로드하지 않아도 돼요.

물론 디자인을 바꾸거나 새로운 기능을 추가하고 싶으면 언제든
다시 오셔서 말씀해주세요.
