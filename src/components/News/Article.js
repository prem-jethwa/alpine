import classes from "./styles/news.module.css";

const formateDate = (IOSDate) => {
  const date = new Date(IOSDate);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

const Article = ({ art }) => {
  return (
    <article className={classes.article}>
      <img src={art.image} alt="NO IMAGE" />
      <div className={classes["art-content"]}>
        <h2 className={classes.title}>{art.title}</h2>
        <p className={classes.content}>
          {" "}
          {art.description && <span> Content : {art.description}</span>}{" "}
          <a target="_blank" href={art.url}>
            Read More
          </a>
        </p>
        <div className={classes.source}>
          <p>{art.source && "Source : " + art.source}</p>
          <p>
            {art.publishedAt &&
              "Published On : " + formateDate(art.publishedAt)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Article;

/*

//For newsaip.com

<article className={classes.article}>
<img src={art.urlToImage} alt="NO IMAGE" />
<div className={classes["art-content"]}>
  <h2 className={classes.title}>{art.title}</h2>
  <p className={classes.content}>
    {" "}
    <span> Content : </span> {art.content && art.content}{" "}
    <a target="_blank" href={art.url}>
      Read More
    </a>
  </p>
  <div className={classes.source}>
    <p>{art.source?.name && "Source : " + art.source.name}</p>
    <p>
      {art.publishedAt &&
        "Published On : " + formateDate(art.publishedAt)}
    </p>
  </div>
</div>
</article>
*/
