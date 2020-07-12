import React, { useState, useEffect } from 'react';
import './App.css';

const countPerMore = 6;    // 每次loadmore显示的数量
const heightPerImg = 200;  // 每个img高度，在css中设置

const refApp = React.createRef<HTMLDivElement>();

// 假设拥有的图片数
const imgsIndex = [];
for (let i = 0; i < 30; i++) {
  imgsIndex.push(i);
}

function App() {
  const [imgsDisplayingIndex, setImgsDisplayingIndex] = useState<number[]>([]);  // 显示中的img

  // 这里是下拉自动刷新，也可以使用 loadMoreButton 的方式
  const handleScroll = () => {
    // const clientHeight = refApp.current?.clientHeight ? refApp.current?.clientHeight : 0;
    // const scrollTop = refApp.current?.scrollTop ? refApp.current?.scrollTop : 0;
    // const scrollHeight = refApp.current?.scrollHeight ? refApp.current?.scrollHeight : 0;
    // if (scrollHeight - scrollTop - clientHeight <= 5) {  // 距离还有5的时候触发
    //   handleLoadMore();
    // }
  }

  const handleLoadMore = () => {
    const countDisplaying = imgsDisplayingIndex.length;
    const imgsTmp: number[] = [];

    for (let i = countDisplaying; i < countDisplaying + countPerMore && i < imgsIndex.length; i++) {
      imgsTmp.push(i);
    }
    setImgsDisplayingIndex(prev => prev.concat(imgsTmp));
  }

  useEffect(() => {
    const imgsTmp = [];

    const imgLines = refApp.current?.clientHeight ? Math.ceil(refApp.current?.clientHeight / heightPerImg) : 0;  // 放多少行img
    for (let i = 0; i < imgLines; i++) {
      imgsTmp.push(i);
    }

    setImgsDisplayingIndex(imgsTmp);
  }, []);

  // 这里是loadMoreButton，也可以使用 下拉自动刷新 的方式
  const loadMoreButton = imgsDisplayingIndex.length < imgsIndex.length ? (
    <div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  ) : null;

  // 触发scroll的前提是app div设置了height以及overflow，app div的children超出了设置的height
  // scroll是冒泡的，即header div, content div, footer div如果有scroll事件，可以在app div捕捉到
  return (
    <div className='App' onScroll={handleScroll} ref={refApp}>
      <div className='Header'>Header</div>
      <div className='Content'>
        {imgsDisplayingIndex.map(imgIdx => (
          <div className='img-mock' key={imgIdx}>img #{imgIdx+1}</div>
        ))}
        {loadMoreButton}
      </div>
      <div className='Footer'>Footer</div>
    </div>
  );
}

export default App;
