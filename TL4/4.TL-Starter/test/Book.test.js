import Book from "../src/model/Book";

//The longest title of a book consists of 26,021 characters, and was achieved by Vityala Yethindra (India) in Bishkek, Kyrgyzstan, on 20 March 2019. (guinnessworldrecords.com)
const longestBooktitleExisting = "t".repeat(26021);
const veryLongBookDescription = "d".repeat(9405);

const testBook = new Book("Brida", "Paulo Coelho", "9783257066", "This is the story of Brida, a young Irish girl, and her quest for knowledge. She has long been interested in various aspects of magic but is searching for something more. Her search leads her to people of great wisdom, who begin to teach Brida about the spiritual world. She meets a wise man who dwells in a forest, who teaches her about overcoming her fears and trusting in the goodness of the world; and a woman who teaches her how to dance to the music of the world, and how to pray to the moon. As Brida seeks her destiny, she struggles to find a balance between her relationships and her desire to become a witch.");
const minimalTestBook = new Book("t", "P", "9783257066", "T");
const numberTestBook = new Book("89056", "9067", "9783257066", "79825");

describe("test suite for Book", () => {
    test("book constructor sets the right title for valid inputs", () => {
        //when + then
        expect(testBook.title).toEqual("Brida");
    });
    
    test("book constructor sets the right author for valid inputs", () => {
        //when + then
        expect(testBook.author).toEqual("Paulo Coelho");
    });
    
    test("book constructor sets the right isbn for valid inputs", () => {
        //when + then
        expect(testBook.isbn).toEqual("9783257066");
    });
    
    test("book constructor sets the right description for valid inputs", () => {
        //given + when 
        const expectedInput = "This is the story of Brida, a young Irish girl, and her quest for knowledge. She has long been interested in various aspects of magic but is searching for something more. Her search leads her to people of great wisdom, who begin to teach Brida about the spiritual world. She meets a wise man who dwells in a forest, who teaches her about overcoming her fears and trusting in the goodness of the world; and a woman who teaches her how to dance to the music of the world, and how to pray to the moon. As Brida seeks her destiny, she struggles to find a balance between her relationships and her desire to become a witch.";
        //then
        expect(testBook.description).toEqual(expectedInput);
    });
    
    test("book constructor throws an error when an empty string for the title is provided ", () => {
        //when + then 
        expect(() => {
            const book = new Book("", "Paulo Coelho", "9783257066", "This is the story of Brida, a young Irish girl, and her quest for knowledge. She has long been interested in various aspects of magic but is searching for something more. Her search leads her to people of great wisdom, who begin to teach Brida about the spiritual world. She meets a wise man who dwells in a forest, who teaches her about overcoming her fears and trusting in the goodness of the world; and a woman who teaches her how to dance to the music of the world, and how to pray to the moon. As Brida seeks her destiny, she struggles to find a balance between her relationships and her desire to become a witch.");
        }).toThrowError(/fields/);
    });
    
    test("book constructor throws an error when an empty string for the author is provided", () => {
        //when + then
        expect(() => {
            const book = new Book("Brida", "", "9783257066", "This is the story of Brida, a young Irish girl, and her quest for knowledge. She has long been interested in various aspects of magic but is searching for something more. Her search leads her to people of great wisdom, who begin to teach Brida about the spiritual world. She meets a wise man who dwells in a forest, who teaches her about overcoming her fears and trusting in the goodness of the world; and a woman who teaches her how to dance to the music of the world, and how to pray to the moon. As Brida seeks her destiny, she struggles to find a balance between her relationships and her desire to become a witch.");
        }).toThrowError(/fields/);
    });
    
    test("book constructor throws an error when an empty string for the ISBN is provided", () => {
        //when + then
        expect(() => {
            const book = new Book("Brida", "Paulo Coelho", "", "This is the story of Brida, a young Irish girl, and her quest for knowledge. She has long been interested in various aspects of magic but is searching for something more. Her search leads her to people of great wisdom, who begin to teach Brida about the spiritual world. She meets a wise man who dwells in a forest, who teaches her about overcoming her fears and trusting in the goodness of the world; and a woman who teaches her how to dance to the music of the world, and how to pray to the moon. As Brida seeks her destiny, she struggles to find a balance between her relationships and her desire to become a witch.");
        }).toThrowError(/fields/);
    });
    
    test("book constructor throws an error when an empty string for the description is provided", () => {
        //when + then
        expect(() => {
            const book = new Book("Brida", "Paulo Coelho", "9783257066", "");
        }).toThrowError(/fields/);
    });
    
    test("book constructor throws an error when empty strings for all inputs are provided", () => {
        //when + then
        expect(() => {
            const book = new Book("", "", "", "");
        }).toThrowError(/fields/);
    });
    
    test("book constructor throws an error when null for all inputs is provided", () => {
        //when + then
        expect(() => {
            const book = new Book(null, null, null, null);
        }).toThrow();
    });
    
    test("book constructor creates book with null as input", () => {
        //given + when
        const book = new Book(null, "Paulo Coelho", "9783257066", "This is the story of Brida")
        //then
        expect(book.title).toBeNull();
    });
    
    test("book constructor works for the longest booktitle existing (26021 characters)", () => {
        //given
        const testLongestBooktitle = "t".repeat(26021);
        //when
        const book = new Book(longestBooktitleExisting, "Paulo Coelho", "9783257066", "This is the story of Brida, a young Irish girl, and her quest for knowledge. She has long been interested in various aspects of magic but is searching for something more. Her search leads her to people of great wisdom, who begin to teach Brida about the spiritual world. She meets a wise man who dwells in a forest, who teaches her about overcoming her fears and trusting in the goodness of the world; and a woman who teaches her how to dance to the music of the world, and how to pray to the moon. As Brida seeks her destiny, she struggles to find a balance between her relationships and her desire to become a witch.");
        //then
        expect(book.title).toEqual(testLongestBooktitle);
    });
    
    //man with the longest name ever Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr. (wikipedia.org)
    test("book constructor works for the longest name that ever existed(949 characters)", () => {
        //given + when
        const book = new Book("Brida", "Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth Lloyd Martin Nero Oliver Paul Quincy Randolph Sherman Thomas Uncas Victor William Xerxes Yancy Zeus Wolfeschlegel­steinhausen­bergerdorff­welche­vor­altern­waren­gewissenhaft­schafers­wessen­schafe­waren­wohl­gepflege­und­sorgfaltigkeit­beschutzen­vor­angreifen­durch­ihr­raubgierig­feinde­welche­vor­altern­zwolfhundert­tausend­jahres­voran­die­erscheinen­von­der­erste­erdemensch­der­raumschiff­genacht­mit­tungstein­und­sieben­iridium­elektrisch­motors­gebrauch­licht­als­sein­ursprung­von­kraft­gestart­sein­lange­fahrt­hinzwischen­sternartig­raum­auf­der­suchen­nachbarschaft­der­stern­welche­gehabt­bewohnbar­planeten­kreise­drehen­sich­und­wohin­der­neue­rasse­von­verstandig­menschlichkeit­konnte­fortpflanzen­und­sich­erfreuen­an­lebenslanglich­freude­und­ruhe­mit­nicht­ein­furcht­vor­angreifen­vor­anderer­intelligent­geschopfs­von­hinzwischen­sternartig­raum Sr.", 9783257066, "This is the story of Brida, a young Irish girl, and her quest for knowledge. She has long been interested in various aspects of magic but is searching for something more. Her search leads her to people of great wisdom, who begin to teach Brida about the spiritual world. She meets a wise man who dwells in a forest, who teaches her about overcoming her fears and trusting in the goodness of the world; and a woman who teaches her how to dance to the music of the world, and how to pray to the moon. As Brida seeks her destiny, she struggles to find a balance between her relationships and her desire to become a witch.");
        //then
        expect(book.author).toEqual("Adolph Blaine Charles David Earl Frederick Gerald Hubert Irvin John Kenneth Lloyd Martin Nero Oliver Paul Quincy Randolph Sherman Thomas Uncas Victor William Xerxes Yancy Zeus Wolfeschlegel­steinhausen­bergerdorff­welche­vor­altern­waren­gewissenhaft­schafers­wessen­schafe­waren­wohl­gepflege­und­sorgfaltigkeit­beschutzen­vor­angreifen­durch­ihr­raubgierig­feinde­welche­vor­altern­zwolfhundert­tausend­jahres­voran­die­erscheinen­von­der­erste­erdemensch­der­raumschiff­genacht­mit­tungstein­und­sieben­iridium­elektrisch­motors­gebrauch­licht­als­sein­ursprung­von­kraft­gestart­sein­lange­fahrt­hinzwischen­sternartig­raum­auf­der­suchen­nachbarschaft­der­stern­welche­gehabt­bewohnbar­planeten­kreise­drehen­sich­und­wohin­der­neue­rasse­von­verstandig­menschlichkeit­konnte­fortpflanzen­und­sich­erfreuen­an­lebenslanglich­freude­und­ruhe­mit­nicht­ein­furcht­vor­angreifen­vor­anderer­intelligent­geschopfs­von­hinzwischen­sternartig­raum Sr.");
    });
    
    test("book constructor works with very long description", () => {
        //given
        const testVeryLongestBookdescription = "d".repeat(9405);
        //when
        const book = new Book("Brida", "Paulo Coelho", "9783257066", veryLongBookDescription);
        //then
        expect(book.description).toEqual(testVeryLongestBookdescription);
    });

    test("book constructor sets right title for minimal inputs", () => {
        //when + then
        expect(minimalTestBook.title).toEqual("t");
    });

    test("book constructor sets right author for minimal inputs", () => {
        //when + then
        expect(minimalTestBook.author).toEqual("P");
    });

    test("book constructor sets right isbn for minimal inputs", () => {
        //when + then
        expect(minimalTestBook.isbn).toEqual("9783257066");
    });

    test("book constructor sets right description for minimal inputs", () => {
        //when + then
        expect(minimalTestBook.description).toEqual("T");
    });

    test("book constructor sets right title for number inputs", () => {
        //when + then
        expect(numberTestBook.title).toEqual("89056");
    });

    test("book constructor sets right author for number inputs", () => {
        //when + then
        expect(numberTestBook.author).toEqual("9067");
    });

    test("book constructor sets right isbn for number inputs", () => {
        //when + then
        expect(numberTestBook.isbn).toEqual("9783257066");
    });

    test("book constructor sets right description for nunber inputs", () => {
        //when + then
        expect(numberTestBook.description).toEqual("79825");
    });
    
    test("book constructor throws an error when the provided isbn is too short", () => {
        //when + then
        expect(() => {
            const book = new Book("Brida", "Paulo Coelho", "978325706", "This is the story of Brida");
        }).toThrowError(/ISBN/);
    });
    
    test("book constructor throws an error when the provided isbn is too long", () => {
        //when + then
        expect(() => {
            const book = new Book("Brida", "Paulo Coelho", "97832570689", "This is the story of Brida");
        }).toThrowError(/ISBN/);
    });
    
    test("book constructor throws an error when the provided isbn contains another character than only numbers", () => {
        //when + then
        expect(() => {
            const book = new Book("Brida", "Paulo Coelho", "97832570Y6", "This is the story of Brida");
        }).toThrowError(/ISBN/);
    });

    test("book constructor sets rating to 1 upon construction", () => {
        //when 
        const testBook = new Book("title", "author", "1234567890", "description");
        //then
        expect(testBook.rating).toEqual(1);
    });
});
