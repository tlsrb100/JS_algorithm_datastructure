# doubly Linked list

> ## 배열과 차이점
### 배열

  * 각 요소가 인덱스를 가지고 정렬되어 있다.
  * 특정 인덱스에 바로 접근이 가능하다. 
  * 삽입과 삭제시 연결리스트에 비해 불리하다(인덱스를 재정렬해야하기 때문)
### doubly Linked list
* 인덱스를 가지지 않는다.
* 다수의 노드는 prev와 next 포인터를 통해 서로 연결되어 있다.
* 랜덤 엑세스가 허용되지 않는다(x번째 노드를 찾기 위해선 첫번째부터 해당 노드까지 순서대로 따라가야 한다)
* 삽입과 삭제를 쉽게 할 수 있다.
  

>### doubly Linked list의 세가지 속성
![](images/2022-09-21-09-25-43.png)

1. head : 연결 리스트의 시작 노드를 가리킨다.
2. tail : 연결 리스트의 마지막 노드를 가리킨다. (중간의 노드는 일일히 추적하지 않는다.)
3. length : 연결 리스트의 길이를 나타낸다.


>### Big O 복잡도
* Insertion - O(1)
* Removal - O(1)
* Searching - O(N) (this.length/2를 기준으로 검색하므로 기술적으론 O(N/2)이다.
* Access - O(N)  
  



데이터를 반대 방향으로 접근해야 하는 경우 ex)브라우저 히스토리에 적용 - 뒤로가기, 앞으로가기  
같은 경우에는 이중 연결 리스트로 쉽게 사용 가능하다.  
또한 무언가를 찾는데 더 나은 성능을 발휘한다.  
하지만 prev 포인터가 추가되므로 더 많은 메모리를 필요로 한다.