// Lesson data structure
const lessonData = [
    {
        day: 1,
        title: "First Impressions Matter",
        tip: {
            title: "The 10-5-1 Rule of Guest Acknowledgment",
            description: `
                <p>The most critical moment in your service journey happens before you even say a word. First impressions set the tone for the entire dining experience, and the 10-5-1 Rule is your secret weapon for making guests feel welcome from the moment they enter your restaurant.</p>
                
                <div class="tip-highlight">
                    <p><strong>Here's how it works:</strong></p>
                    <ul>
                        <li><strong>10 feet away:</strong> Make eye contact and smile. This simple acknowledgment signals that you've noticed them and they matter to you.</li>
                        <li><strong>5 feet away:</strong> Offer a warm verbal greeting such as "Good evening" or "Welcome to [Restaurant Name]." Your tone should be friendly and genuine.</li>
                        <li><strong>1 foot away:</strong> Provide a personal introduction: "Hi, my name is [Your Name], and I'll be taking care of you tonight." Then, offer to start them with a drink or explain any specials.</li>
                    </ul>
                </div>
                
                <p>This progressive approach prevents guests from feeling ignored while giving you time to finish your current task before fully engaging. Studies show that guests form their first impression of both you and the restaurant within the first 7 seconds of interaction!</p>
                
                <div class="pro-tip">
                    <p><strong>Pro tip:</strong> Even when you're busy with another table, that quick eye contact and smile at 10 feet tells waiting guests "I see you, and I'll be with you soon." This small gesture can dramatically reduce perceived wait times and improve satisfaction scores.</p>
                </div>
            `
        },
        quiz: {
            question: "A family of four has just been seated at one of your tables. According to the 10-5-1 Rule, what should you do when you're approximately 5 feet away from their table?",
            options: [
                "Introduce yourself by name and take their drink orders",
                "Make eye contact and smile at the guests",
                "Offer a warm verbal greeting like \"Welcome to our restaurant\"",
                "Immediately hand out menus and list the daily specials"
            ],
            correctAnswer: 2,
            explanation: "The 10-5-1 Rule specifies that at 10 feet you make eye contact and smile, at 5 feet you offer a verbal greeting, and at 1 foot you provide a personal introduction. Following this sequence creates a natural progression that makes guests feel acknowledged and welcomed without overwhelming them immediately."
        },
        quote: {
            text: "People will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
            author: "Maya Angelou"
        },
        completed: false
    },
    {
        day: 2,
        title: "Menu Knowledge Mastery",
        tip: {
            title: "The Three-Bite Check-In",
            description: `
                <p>Timing is everything when checking in with your guests after they've received their food. The "Three-Bite Check-In" rule ensures you're providing attentive service without being intrusive.</p>
                
                <div class="tip-highlight">
                    <p><strong>Here's how it works:</strong></p>
                    <p>Wait until your guests have taken approximately three bites of their meal before approaching the table to check on their satisfaction. This timing is ideal because:</p>
                    <ol>
                        <li>It gives guests enough time to experience the food properly</li>
                        <li>They've had a chance to notice if anything is wrong</li>
                        <li>It's early enough to fix any issues before the meal is half-finished</li>
                    </ol>
                </div>
                
                <p>When you approach, use open-ended questions like "How are you enjoying your meal?" rather than yes/no questions like "Is everything okay?" Open-ended questions encourage genuine feedback and show you're truly interested in their experience.</p>
                
                <div class="pro-tip">
                    <p><strong>Pro tip:</strong> If you notice a guest hasn't touched their food while others at the table are eating, don't wait for the three-bite mark. Approach discreetly and ask if everything is to their liking. This proactive approach can catch and resolve issues before they become complaints.</p>
                </div>
            `
        },
        quiz: {
            question: "When using the Three-Bite Check-In rule, which of the following is the most effective question to ask guests?",
            options: [
                "Is everything okay with your meal?",
                "How are you enjoying your entrée so far?",
                "Do you need anything else right now?",
                "Would you like to see our dessert menu?"
            ],
            correctAnswer: 1,
            explanation: "This open-ended question encourages guests to share their genuine thoughts about the meal rather than giving a simple \"yes\" or \"no\" response. It shows you're interested in their specific experience and opens the door for them to mention any concerns or special requests."
        },
        quote: {
            text: "The best way to find yourself is to lose yourself in the service of others.",
            author: "Mahatma Gandhi"
        },
        completed: false
    },
    {
        day: 3,
        title: "Efficient Order Taking",
        tip: {
            title: "The Clockwise Method",
            description: `
                <p>Taking orders efficiently while maintaining a personal connection with guests is a crucial server skill. The "Clockwise Method" is a simple technique that will help you appear organized and professional.</p>
                
                <div class="tip-highlight">
                    <p><strong>Here's how it works:</strong></p>
                    <p>When taking orders at a table, always work in a consistent clockwise direction, starting from the same position each time (typically to the left of the host or the person who appears to be leading the group).</p>
                    <ol>
                        <li>Begin by acknowledging the entire table: "Is everyone ready to order?"</li>
                        <li>Turn to the first person on your left and take their complete order</li>
                        <li>Move clockwise around the table, taking each person's order in sequence</li>
                        <li>Repeat orders back to confirm accuracy</li>
                        <li>Thank the table and provide an estimated time for their food</li>
                    </ol>
                </div>
                
                <p>This systematic approach has several benefits:</p>
                <ul>
                    <li>You'll never forget who ordered what</li>
                    <li>Guests know when their turn is coming</li>
                    <li>The kitchen receives orders in a logical sequence</li>
                    <li>You appear professional and methodical</li>
                </ul>
                
                <div class="pro-tip">
                    <p><strong>Pro tip:</strong> For large parties, use position numbers on your notepad (P1, P2, etc.) and draw a quick table diagram. This helps both you and the food runners deliver the right dishes to the right guests without asking "Who had the salmon?"</p>
                </div>
            `
        },
        quiz: {
            question: "When using the Clockwise Method at a table of six guests, what should you do if the third person in sequence isn't ready to order yet?",
            options: [
                "Skip them and come back after taking everyone else's order",
                "Wait until they decide, keeping everyone else waiting",
                "Suggest they order the daily special to speed things up",
                "Ask them to signal you when they're ready and continue with the fourth person"
            ],
            correctAnswer: 0,
            explanation: "Maintaining flow is important for efficient service. By continuing around the table and returning to the undecided guest last, you respect both their need for more time and the other guests who are ready to order. This keeps the service moving without pressuring anyone."
        },
        quote: {
            text: "The customer doesn't expect everything will go right all the time; the big test is what you do when things go wrong.",
            author: "Sir Colin Marshall, former CEO of British Airways"
        },
        completed: false
    },
    {
        day: 4,
        title: "Handling Special Requests",
        tip: {
            title: "The YES Approach",
            description: `
                <p>Special requests and modifications are a regular part of restaurant service. The "YES Approach" helps you handle these situations with grace and professionalism.</p>
                
                <div class="tip-highlight">
                    <p><strong>Here's how it works:</strong></p>
                    <p>When a guest makes a special request, remember the YES formula:</p>
                    <ul>
                        <li><strong>Y - Yield</strong> to the request with a positive attitude. Your first response should always be positive, even if you're not sure if the request can be accommodated.</li>
                        <li><strong>E - Explore</strong> options to fulfill the request. Think creatively about how the kitchen might be able to modify a dish or what alternatives you could offer.</li>
                        <li><strong>S - Solve</strong> by either confirming you can meet their needs or offering the closest alternative.</li>
                    </ul>
                </div>
                
                <p>For example, if a guest asks for a dish that's not on the menu:</p>
                <ul>
                    <li>Yield: "That sounds delicious! Let me see what we can do."</li>
                    <li>Explore: Consider if the kitchen has the ingredients and capability to make it.</li>
                    <li>Solve: "Our chef can prepare that for you" or "While we can't make that exactly, our chef suggests this similar dish that you might enjoy."</li>
                </ul>
                
                <div class="pro-tip">
                    <p><strong>Pro tip:</strong> Never say a flat "No" to a guest request. Even when you can't accommodate exactly what they want, always offer an alternative: "We don't have chocolate ice cream, but our homemade vanilla bean is exceptional, or I can offer you our chocolate mousse instead."</p>
                </div>
            `
        },
        quiz: {
            question: "A guest with a gluten allergy asks if the pasta dish can be made gluten-free. Your restaurant doesn't have gluten-free pasta. Using the YES Approach, what is the best response?",
            options: [
                "No, sorry, all our pasta contains gluten.",
                "I apologize, but we can't accommodate that request.",
                "I'd be happy to help with your dietary needs. While we don't have gluten-free pasta, our risotto and grilled salmon are both excellent gluten-free options I can recommend.",
                "You should probably order a salad instead."
            ],
            correctAnswer: 2,
            explanation: "This response follows the YES Approach perfectly. It yields to the request with a positive attitude, acknowledges the limitation, and solves the problem by offering specific alternatives that meet the guest's dietary needs."
        },
        quote: {
            text: "Your customer doesn't care how much you know until they know how much you care.",
            author: "Damon Richards"
        },
        completed: false
    },
    {
        day: 5,
        title: "Creating Memorable Farewells",
        tip: {
            title: "The Last Impression Principle",
            description: `
                <p>While first impressions are crucial, the last impression often determines whether guests will return. The "Last Impression Principle" helps you end each guest experience on a high note.</p>
                
                <div class="tip-highlight">
                    <p><strong>Here's how it works:</strong></p>
                    <p>The final moments of a guest's visit follow a predictable pattern, giving you multiple opportunities to create a positive lasting impression:</p>
                    <ol>
                        <li><strong>The Check Presentation</strong>: Present the check promptly when requested, in a clean folder with a pen that works.</li>
                        <li><strong>The Payment Process</strong>: Process payment efficiently and thank the guest for their business.</li>
                        <li><strong>The Genuine Goodbye</strong>: Thank guests by name if possible, invite them to return, and offer a specific reason to come back.</li>
                        <li><strong>The Final Touch</strong>: Walk guests to the door when possible, or at minimum, make eye contact and wave as they leave.</li>
                    </ol>
                </div>
                
                <p>Research shows that guests remember the beginning and end of their dining experience most vividly (the "peak-end rule"). By creating a warm, efficient farewell, you significantly increase the likelihood of return visits.</p>
                
                <div class="pro-tip">
                    <p><strong>Pro tip:</strong> Personalize your goodbye based on conversation points from their meal. "Mr. Johnson, I hope your daughter's soccer tournament goes well this weekend! We'd love to see you again for our prime rib special on Thursday."</p>
                </div>
            `
        },
        quiz: {
            question: "According to the Last Impression Principle, which of the following is the MOST effective way to present a check to a table?",
            options: [
                "Place the check on the table as soon as they finish eating to save time",
                "Wait until the guests ask for the check, then present it promptly in a clean folder with a working pen",
                "Tell guests their total verbally to avoid paperwork",
                "Leave the check at the host stand for guests to pick up when leaving"
            ],
            correctAnswer: 1,
            explanation: "Timing is crucial for check presentation. Presenting too early can make guests feel rushed, while waiting too long after they've requested it can frustrate them. The professional presentation (clean folder, working pen) shows attention to detail and respect for the guest's time during this final transaction."
        },
        quote: {
            text: "We see our customers as invited guests to a party, and we are the hosts. It's our job every day to make every important aspect of the customer experience a little bit better.",
            author: "Jeff Bezos"
        },
        completed: false
    }
];

// Save lesson data to localStorage if it doesn't exist
if (!localStorage.getItem('serverSchoolLessons')) {
    localStorage.setItem('serverSchoolLessons', JSON.stringify(lessonData));
}
