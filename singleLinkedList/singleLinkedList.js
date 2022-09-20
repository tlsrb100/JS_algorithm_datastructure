//node 클래스  - val와 다음 노드를 가르키는 포인터를 가진다.
class Node{
  constructor(val){
    this.val = val;
    this.next = null;
  }
}

//단일 연결 리스트 클래스 - 노드의 시작과 끝 포인터와 길이를 가진다.
class SinglyLinkedList{
  constructor(){
  this.head = null;
  this.tail = null;
  this.length = 0;
  }


  // 인스턴스 메소드 push()
  //새로운 node를 생성 후 head(시작노드)가 없으면 head과 tail에 해당 노드를 가르키게 한다.
  //새로운 node를 생성 후 head(시작노드)가 있다면 현재 tail의 next가 새로운 노드를 가르킴 + 현재 tail은 새로운 노드가 됨
  push(val){ 
      const newNode = new Node(val);
      if(!this.head){
          this.head = newNode;
          this.tail = this.head;
      }else{
          this.tail.next = newNode;
          this.tail = newNode;
      }
      this.length++; //새로운 노드가 생성될때마다 길이가 증가
      return this;    
  }


  // 인스턴스 메소드 pop()
  //newTail과 current 두 변수로 노드를 따라간다.
  //current이 마지막 노드가 될때 newTail은 항상 그 전 노드가 된다. 마지막노드와의 연결을 끊고 새로운 노드가 tail이 된다.
  pop(){
  if(!this.head) return undefined;//리스트에 노드가 하나도 없는 경우 undefiend 리턴
    let current = this.head;
    let newTail = current;
    
    while(current.next){
      newTail = current;//newTail은 current에 한 노드 뒤쳐진상태로 따라간다.
      current = current.next;
    }
    this.tail = newTail; //newTail을 새로운 tail 노드로 지정한다.
    this.tail.next = null; //current와 연결을 끊고 마지막 노드가 된다.
    this.length--;
    
    if(this.length===0){//노드가 한개에서 0개로 비워졌을때 경우. 리스트크기가 0이 되는걸 감지해서 head, tail값 초기화
      this.head = null;
      this.tail = null;
    }
    return current;
  }
	

  // 인스턴스 메소드 shift()
  //리스트의 첫번째인 노드가 currentHead가 된다. shift()는 currentHead를 리턴한다. 
  //currentHead의 다음노드가 리스트의 head가 된다.
  shift(){
    if(!this.head) return undefined; //리스트에 노드가 하나도 없는 경우 undefiend 리턴
    let currentHead = this.head; //리스트의 head가 가리키는 노드가 삭제할 노드가 된다.
    this.head = currentHead.next; //삭제할 노드 다음노드를 리스트의 head로 설정
    this.length--;
    
    if(this.length===0){
      this.tail = null;
    }
    return currentHead;
  }

  // 인스턴스 메소드 unshift()
  //새로운 node를 생성 후 head(시작노드)가 없으면 head과 tail에 해당 노드를 가르키게 한다.
  //새로운 node를 생성 후 head(시작노드)가 있다면 리스트의 head가 새로운 node를 가리키고 새로운 node의 next는 기존 this.head가 된다.
  unshift(val){
    const newNode = new Node(val);
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
      this.length++;
    }else{
      newNode.next = this.head;
      this.head = newNode;
      this.length++;
    }
    return this;
  }

  
  // 인스턴스 메소드 get()
  //current 변수를 사용해서 current.next로 다음 노드로 계속 따라간다.
  //노드를 이동할때마다 count를 증가시켜 해당 인덱스가 나올때의 노드의 값을 리턴한다.
  get(idx){
    if(idx > this.length-1 || idx<0 || idx===undefined) return null;
    let count = 0;
    let current = this.head;
    while(count !== idx){

      current = current.next;
      count++;
    }
    return current;
  }


  // 인스턴스 메소드 set()
  //해당 idx의 노드를 리턴하는 get()를 활용한다.
  //get()이 노드를 찾는 경우에는 해당 노드의 값을 변경하고 true 리턴
  //get()이 노드를 찾지 못하는 경우에는 false를 리턴
  set(idx, val){
    let foundNode = this.get(idx);
    if(foundNode){
      foundNode.val = val;
      return true;
    }else{
      return false;
    }
  }

  // 인스턴스 메소드 insert()
  //인자 idx-1에 해당하는 노드 => 연결할 이전 노드
  //찾은 이전 노드의 next가 연결할 다음 노드가 된다.
  //중간에 넣을 노드 앞뒤에 연결해준다.
  insert(idx, val){
    if(idx < 0 || idx > this.length) return false; //idx가 리스트의 길이와 같은것은 유효하다. 제일 끝에 추가되기때문에
    if(idx===0){ 
      this.unshift(val); // 가장 처음에 넣을 경우 unshift와 동일
      return true;
    }else if(idx===this.length){
      this.push(val); // 가장 마지막에 넣을 경우 push와 동일
      return true;
    }else{
      let newNode = new Node(val);
      let preNode = this.get(idx-1)
      let nextNode = preNode.next;

      preNode.next = newNode;
      newNode.next = nextNode;
      this.length++;
      return true;
    }
  }

  // 인스턴스 메소드 remove()
  //인자 idx-1에 해당하는 노드 => 삭제될 노드의 앞 노드
  //삭제될 노드의 앞 노드의 next.next가 다음으로 연결할 노드가 된다.
  remove(idx){
    if(idx < 0 || idx >= this.length) return false;
    if(idx===0){ 
      this.shift(); // 가장 처음을 삭제할 경우 shift와 동일
      return true;
    }else if(idx===this.length){
      this.pop(); // 가장 마지막을 삭제할 경우 pop과 동일
      return true;
    }else{
      let preNode = this.get(idx-1)
      let removedNode = preNode.next;

      preNode.next = removedNode.next;
      this.length--;
      return removedNode;
    }
  }


  // 인스턴스 메소드 remove()
  //처음 head를 tail로 변경한다.
  //tail의 next 노드의 next를 변수에 담아둔다(연결을 기억해두기위함)
  //그리고 tail의 next노드의 next를 이전 노드인 tail을 가르키게 한다.
  //반복하다가 리스트의 마지막인 tail을 만나게 되면 head로 바꾸고 reverse는 끝난다.
  reverse(){
    let node = this.head; //시작 노드
    this.head = this.tail; //tail과 head를 서로 변경
    this.tail = node;
    let nextNode; //다음 노드 추적
    let preNode = null; //이전 노드 추적
  for(let i=0; i<this.length; i++){
    nextNode = node.next; //연결을 유지하기 위해서 현재 노드의 next노드를 변수에 저장 
    node.next = preNode; // 현재 노드의 next에 이전값을 넣어줌으로서 reverse가 된다.

    //다음 스텝을 위한 값 변경 
    preNode = node; //현재노드가 다음 스텝에선 이전 노드가 된다.
    node = nextNode;//다음노드가 다음 스텝에선 현재 노드가 된다.
  }
  console.log(this)
  return this;
  }
}



const list = new SinglyLinkedList();
list.push(50);
list.push(40);
list.push(30);
list.push(20);
list.push(10);
list.reverse();