import { TransformToSnakeCase } from './common/decorator/case-tranform.decorator';

class TestController {
  @TransformToSnakeCase({ logTransform: true })
  createFood(dto: any) {
    console.log('메서드 내부에서 받은 dto:', dto);
    // 실제로는 변환된 데이터가 출력되어야 함
    return dto;
  }
}

// 테스트
const controller = new TestController();
const result = controller.createFood({ userName: '홍길동', userId: 123 });

console.log('결과:', result);
// 예상 출력:
// 메서드 내부에서 받은 dto: { user_name: "홍길동", user_id: 123 }
// 결과: { user_name: "홍길동", user_id: 123 }
