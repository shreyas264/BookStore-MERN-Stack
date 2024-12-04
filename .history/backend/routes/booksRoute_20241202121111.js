//Route for Save a new Book
app.post('/books', async (request, response)=> {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        
        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for get all Books from database
app.get('/books', async (request, response)=>{
    try {
        const books = await Book.find({});

        return response.status(200).json(
            {count: books.length,
            data: books}
        );
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
}); 

//Route for get Books from database with ID
app.get('/books/:id', async (request, response)=>{
    try {
        const { id } = request.params;

        const books = await Book.findById(id);

        return response.status(200).json(books);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
}); 

//Route for update a book
app.put('/books/:id', async (request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body, {new: true});

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book updated successfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});


//Route for delete a book
app.delete('/books/:id', async (request, response)=>{
    try{
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({ message: 'Book not found'});
        }

        return response.status(200).send({ message: 'Book deleted successfully'});

    } catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
})