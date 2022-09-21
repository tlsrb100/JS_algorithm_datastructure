//node 클래스  - val와 다음, 이전 노드를 가르키는 포인터를 가진다.

class Node{
  constructor(val){
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

//이중 연결 리스트 클래스 - 노드의 시작, 끝 포인터와 길이를 가진다.
class DoublyLinkedList{
  constructor(){
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 인스턴스 메소드 push()
  //새로운 node를 생성 후 head(시작노드)가 없으면
  //1.head과 tail에 해당 노드를 가르키게 한다.
  //새로운 node를 생성 후 head(시작노드)가 있다면
  //1.현재 tail의 next가 새로운 노드를 가르킴 
  //2.새로운 노드의 prev는 현재 tail이 됨
  //3.현재 tail은 새로운 노드가 됨
  push(val){
    const newNode = new Node(val);
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
    }else{
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }


  // 인스턴스 메소드 pop()
  //리스트에 head가 없으면(빈 리스트) undefined 리턴
  //노드가 한개있는 경우
  //1.리스트의 head, tail이 null을 가리키게 하면 빈 리스트가 된다.
  //노드가 두개 이상인 경우
  //1.현재 tail 노드를 변수에 저장
  //2.리스트의 tail이 현재 tail의 prev 노드를 가리키게 한다.
  //3.prev노드의 next에 null을 설정함으로서 다음 가리키게 되는 노드가 없어진다.
  //4.삭제되는 노드의 prev도 null로 설정함으로 연결을 완전히 끊는다.
  pop(){
    if(!this.head) return undefined;   //리스트에 head가 없으면(빈 리스트) undefined 리턴
    const removedNode = this.tail; //현재 tail을 removedNode에 저장
    if(this.length===1){  //노드가 한개있는 경우
      this.head = null;
      this.tail = null;
    }else{
      this.tail = removedNode.prev; //removedNode 이전 노드를 리스트의 tail로 설정
      
      //삭제될 노드와 이전 노드간의 연결을 끊는다.
      this.tail.next = null;
      removedNode.prev = null;
    }
    this.length--;
    return removedNode;
  }


  // 인스턴스 메소드 shift()
  shift(){
    if(!this.head) return undefined; //리스트에 head가 없으면(빈 리스트) undefined 리턴
    if(this.length===1){ //노드가 한개있는 경우
      this.head = null;
      this.tail = null;
    }else{
      const oldHead = this.head; //현재 head를 oldHead에 저장
      this.head = oldHead.next; //oldHead의 다음노드를 리스트의 head로 할당
      
      //삭제될 노드와 다음 노드간의 연결을 끊는다
      this.head.prev = null; 
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }
  

  // 인스턴스 메소드 unshift()
  unshift(val){
    const newNode = new Node(val); 
    if(!this.head){  // 리스트의 비어있으면 newNode를 head, tail로 설정
      this.head = newNode;
      this.tail = newNode;
    }else{// newNode를 맨 앞에 붙이고 next, prev값을 맞게 할당
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;

  }


  // 인스턴스 메소드 get()
  get(idx){
    if(idx < 0 || idx >=this.length) return null; //인덱스가 유효한지 먼저 확인
    let count;
    let current;
    if(idx < this.length/2){ //idx가 리스트 전체 길이/2와 비교해서 작은지 체크
      count = 0;
      current = this.head;
      while(count!==idx){
        current = current.next;
        count++;
      }
    }else{//idx가 리스트 전체 길이/2와 비교해서 크거나 같은지 체크
      count = this.length-1; //최대 인덱스부터 시작해서 1씩 마이너스
      current = this.head;
      while(count!==idx){
        current = current.prev;
        count--;
      }
    }
    return current;
  }


    // 인스턴스 메소드 set()
    set(idx, val){
      const foundNode = this.get(idx); //기존 get 메소드 이용해서 리턴받은 노드를 변수 할당
      if(!foundNode){ // 못찾은경우 false
        return false;
      }else{//찾은 경우 val 값을 변경해준다.
        foundNode.val = val;
        return true;
      }
    }


    // 인스턴스 메소드 insert()
    insert(idx, val){
      if(idx < 0 || idx > this.length) return false;
      if(idx===0){ //0번쨰 insert는 unshift와 같다.
        this.unshift(val);
        return true;
      }else if(idx===this.length){//마지막 insert는 push와 같다.
        this.push(val);
        return true;
      }else{
        let newNode = new Node(val);
        let preNode = this.get(idx-1);
        let nextNode = preNode.next;
        //전 노드와 새 노드를 연결
        preNode.next = newNode;
        newNode.prev = preNode;

        //새노드와 다음 노드를 연결
        newNode.next = nextNode;
        nextNode.prev = newNode;

        this.length++;
        return true;
      }
    }


    // 인스턴스 메소드 remove()
    remove(idx){
      if(idx < 0 || idx > this.length) return false;
      if(idx===0){ //0번쨰 remove는 shift 같다.
        return this.shift();
      }else if(idx===this.length-1){//마지막 remove는 pop과 같다.
        return this.pop();
      }else{
        let removeNode = this.get(idx);
        let preNode = removeNode.prev;
        let nextNode = removeNode.next;

        //removeNode의 앞 뒤 노드를 서로 연결해준다
        preNode.newNode = nextNode;
        nextNode.prev = preNode;

        //removeNdoe의 prev, next을 null로 설정
        removeNode.prev = null;
        removeNode.next = null;
        this.length--;
        return removeNode;
      }

      
    }
}



const list = new DoublyLinkedList();
list.push(50);
list.push(40);
list.push(30);
list.push(20);
list.push(10);
list.set(1,1000);