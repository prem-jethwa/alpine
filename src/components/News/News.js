import { memo, useEffect, useState } from "react";
import { getNews } from "../../api/api";
import Article from "./Article";
import Spinner from "../../Spinner";
import classes from "./styles/news.module.css";

const News = () => {
  const perPage = 2;

  const [articles, setArticles] = useState([]);
  const [renderArt, setRenderArt] = useState([]);
  const [page, setPage] = useState(1);
  const [isPageThere, setisPageThere] = useState({ next: true, prev: false });
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();

        setArticles(data.data); // for newsapi.com -> replace 'data.data' to "data.articales"
      } catch (err) {
        setErrMsg("Sorry No News.. Aur api request limit exit.");
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const totalArt = articles.length - 1;
    const totalPage = Math.ceil(totalArt / perPage);
    if (page === 1) {
      setisPageThere(() => {
        return { next: true, prev: false };
      });
    }
    if (page === totalPage) {
      setisPageThere(() => {
        return { next: false, prev: true };
      });
    }

    paginate(page);
  }, [page, articles]);

  async function paginate(page_number) {
    const copyArt = await [...articles];
    const start = (page_number - 1) * perPage;
    const end = page_number * perPage;

    setRenderArt(copyArt.slice(start, end));
  }

  const gotoNextArt = () => {
    const totalArt = articles.length - 1;
    const totalPage = Math.ceil(totalArt / perPage);

    if (page !== totalPage && page < totalPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      setisPageThere(() => {
        return { next: true, prev: true };
      });
    }
  };

  const gotoPrevArt = () => {
    if (page !== 1 && page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      setisPageThere(() => {
        return { next: true, prev: true };
      });
    }
  };

  return (
    <div className={classes["article-container"]} id="art-con">
      <h2 className={classes["news-header"]}>Latest News</h2>
      {!renderArt[0] && !errMsg && <Spinner />}
      {errMsg && <h2> {errMsg} </h2>}
      {renderArt[0] &&
        renderArt.map((art) => {
          return <Article art={art} />;
        })}

      {renderArt[0] && !errMsg && (
        <div className={classes["view-more"]} onClick={() => {}}>
          {isPageThere.prev && (
            <div className={classes.prev} onClick={gotoPrevArt}>
              Previous
            </div>
          )}
          <p className={classes["read-news_title"]}>Read More News</p>
          {isPageThere.next && (
            <div className={classes.next} onClick={gotoNextArt}>
              Next
            </div>
          )}
          <div className={classes["read-news"]}></div>
        </div>
      )}
    </div>
  );
};

export default memo(News);
