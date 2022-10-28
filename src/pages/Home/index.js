import useStore from '~/hooks/useStore';
import Blog from '~/components/Blog';

function Home() {
    const [state, dispatch] = useStore();
    const { blogs } = state;
    return (
        <>
            {blogs &&
                blogs.length > 0 &&
                blogs.map((item) => {
                    return (
                        <Blog
                            key={item.id}
                            Heading={item.Heading}
                            headContent={item.headContent}
                            TagContent={item.TagContent}
                            isOl={item.isOl}
                            contentP={item.contentP}
                            contentList={item.contentList}
                        />
                    );
                })}
        </>
    );
}

export default Home;
