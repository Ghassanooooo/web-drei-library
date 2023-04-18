export default function EditorPage() {
  return (
    <div
      className="h-full preview-width md:w-auto border border-gray-500 rounded-md p-6 preview bg-white full-screen 
      overflow-x-scroll md:overflow-x-auto overflow-hidden"
    >
      <div className="h-full relative">
        <button
          className="absolute top-0 right-7 focus:outline-none"
          type="button"
          aria-label="To Copy"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-emerald-500 focus:outline-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
        </button>
        <textarea className="h-full w-full resize-none focus:outline-none">
          ## FAQ #### Question 1 Answer 1 #### Question 2 Answer 2 ##
          Acknowledgements - [Awesome Readme
          Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
          - [Awesome README](https://github.com/matiassingers/awesome-readme) -
          [How to write a Good
          readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
          ## Demo Insert gif or link to demo ## Deployment To deploy this
          project run ```bash npm run deploy ``` ## Documentation
          [Documentation](https://linktodocumentation) ## Features - Light/dark
          mode toggle - Live previews - Fullscreen mode - Cross platform ##
          Feedback If you have any feedback, please reach out to us at
          fake@fake.com
        </textarea>
      </div>
    </div>
  );
}
