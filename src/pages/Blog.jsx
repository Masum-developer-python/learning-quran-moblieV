

const Blog = ({selectedColor}) =>{
    return(
        <div>
            <p className={`${selectedColor.backgroundColor}
            ${selectedColor.textColor} text-8xl`}>
                Coming Soon!
            </p>
        </div>

    );
}

export default Blog;