# 칸반 보드 프로젝트

Next.js와 TypeScript를 사용하여 구현한 드래그 앤 드롭 기능을 갖춘 칸반 형태의 투두리스트입니다.

## 실행 방법

```
npm run dev
or
npm run build && npm run start
```

## 주요 기능

### 보드 관리 기능

1. **보드 생성**

   - "+ Add Task" 버튼을 통해 새로운 보드를 생성할 수 있습니다.
   - 생성된 보드는 기본적으로 "New Board"라는 제목을 가집니다.

2. **보드 수정**

   - 보드의 제목을 클릭하여 수정할 수 있습니다.
   - 수정 모드에서는 입력 필드가 나타나며, 엔터 키나 포커스 아웃으로 수정을 완료할 수 있습니다.

3. **보드 삭제**

   - 각 보드의 우측 상단에 있는 'X' 버튼을 클릭하여 삭제할 수 있습니다.
   - 삭제 시 confirm 대화상자가 표시됩니다.

4. **보드 순서 변경**
   - 보드를 드래그 앤 드롭하여 순서를 변경할 수 있습니다.
   - 직관적인 UI로 드래그 중인 위치를 시각적으로 확인할 수 있습니다.

### 할 일(Task) 관리 기능

1. **할 일 생성**

   - 각 보드 하단의 "Add Task" 버튼으로 새로운 할 일을 생성할 수 있습니다.
   - 생성된 할 일은 기본적으로 "New Task"라는 내용을 가집니다.

2. **할 일 수정**

   - 할 일을 클릭하여 내용을 수정할 수 있습니다.
   - 수정 시 입력 필드가 나타나며, 엔터 키나 포커스 아웃으로 수정을 완료할 수 있습니다.

3. **할 일 삭제**

   - 각 할 일 카드의 우측에 있는 'X' 버튼을 클릭하여 삭제할 수 있습니다.

4. **할 일 위치 변경**
   - 드래그 앤 드롭으로 할 일의 위치를 자유롭게 변경할 수 있습니다.
   - 같은 보드 내에서의 순서 변경이 가능합니다.
   - 다른 보드로 할 일을 이동할 수 있습니다.
   - 드래그 중인 위치에 파란색 인디케이터가 표시되어 드롭 가능한 위치를 시각적으로 보여줍니다.

## 기술적 특징

- React DnD를 사용한 직관적인 드래그 앤 드롭 구현
- localStorage를 활용해 데이터를 지속적으로 저장하고 관리
- TypeScript를 활용한 타입 안정성 확보
- 컴포넌트 단위의 모듈화로 재사용성과 유지보수성 향상

## 사용 기술

- Next.js 14
- TypeScript
- React DnD
- TailwindCSS
