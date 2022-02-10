

export default function Navbar(){
    return(
        <nav class="flex items-center bg-amber-500">
            <div class="flex w-1/3 justify-start items-center ml-2 bg-amber-500 w-12 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 28 28" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>  
            </div>
            <div class="flex w-1/3 items-center bg-amber-500 justify-center">
                <div class="flex border-2 rounded">
                    <input type="text" class="px-4 py-2 w-80" placeholder="Search..."/>
                        <button class="flex items-center justify-center px-4 border-l">
                            <svg class="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </button>
                    </div>
                </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                 <div class="text-sm lg:flex-grow">
                </div>
                <div>
                    <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
                </div>
        </div>
        </nav>
    );
}