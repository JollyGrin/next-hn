import fetch from "isomorphic-fetch";
import Error from "next/error";
import StoryList from "../components/StoryList";

class Index extends React.Component {
  static async getInitialProps() {
    // define stories
    let stories;

    // catch errors
    try {
      const response = await fetch(
        "https://node-hnapi.herokuapp.com/news?page=1"
      );
      stories = await response.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }

    return { stories };
  }

  render() {
    const { stories } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <div>
        <h1>hacker next</h1>
        <StoryList stories={stories} />
      </div>
    );
  }
}

export default Index;
