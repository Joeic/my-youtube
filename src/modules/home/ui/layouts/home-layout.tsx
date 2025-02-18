interface HomeLayoutProps{
    children: React.ReactNode
};

export const HomeLayout =({children}: HomeLayoutProps) =>{
    return(
        <div>
            <div className="p-4 bg-blue-200">
                <p>Home NavBar</p>
            </div>
            {children}
        </div>
    );
};
