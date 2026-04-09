import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { prompts } from "../src/db/schema"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

const seedData = [
  // Travel & Flights
  {
    title: "Find Cheapest Flights",
    description: "Get the best flight options including hidden deals and timing tips",
    category: "travel",
    optimizedFor: "both",
    tags: ["flights", "budget", "travel"],
    promptText: `I need to fly from [origin city] to [destination city] around [date range]. My budget is [budget]. I'm flexible on departure airport by up to [X miles].

Find me the best options including:
- Cheapest direct flights and one-stop options
- Best days of the week to fly on this route
- Whether nearby airports offer significantly cheaper fares
- Any budget airlines worth considering for this route
- The cheapest months to fly this route generally
- Tips for getting a better price (booking timing, fare alerts, etc.)

Also flag any trade-offs I should know about (layover length, baggage fees, etc.).`,
  },
  {
    title: "Plan a Multi-Day Vacation",
    description: "Get a detailed day-by-day itinerary with budget breakdown",
    category: "travel",
    optimizedFor: "both",
    tags: ["vacation", "itinerary", "planning"],
    promptText: `Plan a detailed [X]-day trip to [destination] for [number of people] with a total budget of [budget].

Include:
- Day-by-day itinerary with specific activities and timing
- Top-rated accommodations at 3 price points (budget/mid/splurge)
- Must-try local foods and restaurant recommendations
- Transportation between attractions
- Cultural tips or things to avoid as a tourist
- Estimated cost breakdown by category (accommodation, food, activities, transport)
- Best time of year to visit and why

Make the itinerary realistic — don't overpack each day.`,
  },
  {
    title: "Discover Hidden Gem Destinations",
    description: "Find underrated travel spots matched to your travel style",
    category: "travel",
    optimizedFor: "both",
    tags: ["destinations", "offbeat", "travel"],
    promptText: `I'm looking for underrated travel destinations that most tourists haven't discovered yet.

My preferences:
- Travel style: [adventure / relaxation / culture / food / mix]
- Budget level: [budget / mid-range / luxury]
- Travel time from [your location or region]
- Ideal trip length: [X days]
- Things I want to avoid: [crowds / long flights / extreme heat / etc.]

Give me 5 hidden gem destinations with:
1. Why it's underrated right now
2. Best time to visit
3. Estimated daily budget
4. Top 3 unique experiences
5. Best way to get there
6. One thing most guides get wrong about it`,
  },

  // Writing & Essays
  {
    title: "Academic Essay Outline",
    description: "Generate a structured outline for any academic essay",
    category: "writing",
    optimizedFor: "claude",
    tags: ["essay", "academic", "outline", "school"],
    promptText: `Create a comprehensive outline for a [word count]-word academic essay on [topic] for a [course name / level] course.

Include:
- A strong, arguable thesis statement
- 3-5 main arguments with supporting evidence points for each
- A counterargument section with a rebuttal strategy
- Introduction strategy (hook + context + thesis)
- Conclusion strategy (synthesis, not just summary)
- 5-8 types of sources to research (journals, books, reports)

Format as a hierarchical outline (I. A. 1. a.) so I can use it as a writing guide.

Thesis should be specific and debatable, not a statement of fact.`,
  },
  {
    title: "Compelling Cover Letter",
    description: "Write a tailored cover letter that stands out",
    category: "writing",
    optimizedFor: "both",
    tags: ["cover letter", "job", "career"],
    promptText: `Write a compelling cover letter for a [job title] position at [company name].

My background: [2-3 sentences about your experience]
Key skills relevant to this role: [list 3-4 skills]
The job requires: [paste key requirements from job listing]
Why I want this specific company: [1-2 genuine reasons]

Make the letter:
- Open with something other than "I am applying for..."
- Specific with metrics and accomplishments where possible
- Show genuine understanding of [company]'s mission or challenges
- Under 400 words
- End with a confident, specific call to action

Avoid: generic phrases, repeating the resume, being overly formal or stiff.`,
  },
  {
    title: "SEO Blog Post",
    description: "Write an engaging, optimized blog post on any topic",
    category: "writing",
    optimizedFor: "both",
    tags: ["blog", "content", "SEO", "writing"],
    promptText: `Write a [word count]-word blog post about [topic] for [target audience].

SEO target keyword: [primary keyword]
Tone: [professional / casual / inspirational / educational]
Goal: [inform / persuade / entertain / drive conversions]

Structure the post with:
- A hook opening that immediately grabs attention (no "In today's world...")
- A clear promise of what the reader will learn
- 4-6 main sections with descriptive subheadings (H2/H3)
- Actionable takeaways or tips in each section
- Real examples, data, or stories to illustrate points
- A conclusion with a clear call to action

Naturally include the keyword in the title, first paragraph, 2-3 subheadings, and throughout. Don't keyword stuff.`,
  },

  // Coding & Development
  {
    title: "Debug My Code",
    description: "Get a root cause analysis and fix for any bug",
    category: "coding",
    optimizedFor: "claude",
    tags: ["debugging", "bug fix", "code"],
    promptText: `I have a bug in my [programming language] code and need help debugging it.

**What the code should do:**
[describe expected behavior]

**What it actually does:**
[describe actual behavior]

**Error message (if any):**
[paste error message]

**Code:**
[paste your code]

**What I've already tried:**
[list what you've attempted]

Please:
1. Identify the root cause of the bug
2. Explain clearly why it's happening
3. Provide a corrected version of the code
4. Suggest how to prevent this type of bug in the future
5. Flag any other potential issues you notice in the code`,
  },
  {
    title: "Code Review",
    description: "Get a thorough review with severity-rated issues",
    category: "coding",
    optimizedFor: "claude",
    tags: ["code review", "refactoring", "best practices"],
    promptText: `Please review the following [language] code for a [type of application / context]:

[paste your code]

Evaluate and provide feedback on:
- **Correctness**: Logic errors, edge cases, off-by-one errors
- **Security**: Vulnerabilities, injection risks, exposed secrets, auth issues
- **Performance**: Bottlenecks, unnecessary computations, memory issues
- **Readability**: Clarity, naming, code organization
- **Maintainability**: Coupling, testability, technical debt
- **Best practices**: Language conventions, design patterns

Format each issue with:
- Severity: [Critical / Major / Minor]
- Location: [line or function name]
- Issue: what's wrong
- Fix: specific recommendation

End with a summary score and top 3 priorities to address.`,
  },
  {
    title: "Kickstart a New Project",
    description: "Get tech stack recommendations, structure, and first steps",
    category: "coding",
    optimizedFor: "both",
    tags: ["project", "architecture", "planning", "startup"],
    promptText: `I want to build [describe your project in 2-3 sentences].

Context:
- Team size: [solo / 2-5 / larger]
- Timeline: [rough estimate]
- Budget for infrastructure: [free / small / flexible]
- My tech background: [languages/frameworks you know well]
- Constraints: [any specific requirements or things to avoid]

Help me:
1. **Tech stack**: Recommend the best stack with a brief justification for each choice
2. **Project structure**: Outline the initial folder structure
3. **MVP scope**: Define the minimum feature set to launch
4. **Technical risks**: Identify the 3 biggest challenges I'll face
5. **First 5 steps**: Concrete actions to start building today
6. **What to avoid**: Common mistakes for this type of project`,
  },

  // Project Planning
  {
    title: "Project Kickoff Document",
    description: "Create a professional project kickoff doc from scratch",
    category: "planning",
    optimizedFor: "both",
    tags: ["project management", "planning", "stakeholders"],
    promptText: `Create a project kickoff document for [project name].

Project details:
- Goal: [what success looks like]
- Stakeholders: [list key people and their roles]
- Timeline: [start date] to [end date]
- Budget: [amount or range]
- Team: [size and key roles]

Include these sections:
1. **Executive Summary** (3-4 sentences)
2. **Scope** — in-scope and explicitly out-of-scope items
3. **Success Metrics / KPIs** — how we'll measure success
4. **Key Milestones** — 4-6 major deliverables with target dates
5. **Risks & Mitigation** — top 3 risks with mitigation strategies
6. **Resource Requirements** — tools, people, budget allocation
7. **Communication Plan** — meeting cadence, reporting, decision process

Keep it concise but complete — this should be shareable with stakeholders.`,
  },
  {
    title: "6-Month Product Roadmap",
    description: "Build a prioritized roadmap with milestones and metrics",
    category: "planning",
    optimizedFor: "both",
    tags: ["roadmap", "product", "strategy"],
    promptText: `Create a 6-month product roadmap for [product name / feature set].

Current state: [brief description of where you are now]
Target outcome by end of 6 months: [what you want to achieve]
Team: [size and composition]
Key constraint: [time / resources / technical debt / market pressure]

Build a roadmap that includes:
- Monthly themes or focus areas
- Specific features or initiatives per month
- Dependencies between items
- Success metrics for each milestone
- Prioritization rationale (use MoSCoW or RICE if helpful)
- One key risk per quarter and how to manage it

Format as a table or structured timeline. Flag anything that's aspirational vs. committed.`,
  },

  // Learning & Research
  {
    title: "Explain Any Concept",
    description: "Get a clear, intuitive explanation tailored to your level",
    category: "learning",
    optimizedFor: "claude",
    tags: ["explanation", "education", "learning"],
    promptText: `Explain [concept or topic] to me. My background: [complete beginner / I know the basics / I'm experienced in a related field — specify].

Structure your explanation as:
1. **The core idea** in one plain-language sentence
2. **An analogy** that makes it intuitive (avoid clichéd analogies)
3. **How it works** step by step
4. **A concrete real-world example**
5. **Common misconceptions** people have about this
6. **Why it matters** — practical applications
7. **What to explore next** — 3 related topics to deepen understanding

Be specific. Vague explanations aren't helpful. If there's nuance or debate around this topic, mention it.`,
  },
  {
    title: "Personalized Study Plan",
    description: "Get a week-by-week study plan with the best resources",
    category: "learning",
    optimizedFor: "both",
    tags: ["study", "learning plan", "skills"],
    promptText: `Create a [X]-week study plan to take me from [current level] to [goal level] in [subject/skill].

My situation:
- Time available: [X hours per week]
- Learning style: [reading / video / hands-on / mixed]
- Access to paid resources: [yes / no / limited]
- Specific goal: [exam / job / project / general knowledge]
- What I already know: [list any relevant background]

For each week include:
- Topic focus and learning objectives
- Best resources (be specific: book title + chapters, course name, YouTube channel)
- Practice exercises or projects
- How to know you've mastered this week's material

End with:
- Milestones to check progress at weeks 2, 4, and the end
- What to skip or deprioritize given my timeline
- The single most important thing to do in the first 3 days`,
  },

  // Career
  {
    title: "Interview Preparation Guide",
    description: "Get role-specific questions, frameworks, and negotiation tips",
    category: "career",
    optimizedFor: "both",
    tags: ["interview", "job", "preparation"],
    promptText: `Help me prepare for a [role title] interview at [company name or type].

Context:
- The role involves: [key responsibilities from the job description]
- My relevant experience: [brief background]
- My main concern: [technical questions / behavioral questions / gaps in experience]
- Interview format: [phone screen / panel / case study / technical / unknown]

Give me:
1. **10 likely interview questions** with frameworks for strong answers (STAR method where appropriate)
2. **3 strong questions to ask the interviewer** that demonstrate strategic thinking
3. **How to address** [specific gap or challenge in your background]
4. **Company research tips**: what to know about [company] going in
5. **Offer negotiation**: what to say if you get an offer and want to negotiate

Be specific to this role. Generic interview advice isn't helpful.`,
  },
  {
    title: "Salary Negotiation Script",
    description: "Get a word-for-word script to negotiate a higher salary",
    category: "career",
    optimizedFor: "both",
    tags: ["salary", "negotiation", "offer"],
    promptText: `I have a job offer I want to negotiate. Help me craft a negotiation script.

Situation:
- Role: [job title]
- Company: [company name]
- Offer received: [base salary] + [other components]
- Market rate for this role in [city]: [salary range from research]
- My current/last salary: [amount] (or "first job")
- My strongest leverage: [competing offer / specialized skills / their urgency / your experience]

Write me:
1. **Opening message/email** to initiate the negotiation (professional, confident, not apologetic)
2. **Verbal script** for a negotiation call — including the opening ask and justification
3. **Response if they say the salary is fixed**: pivot to non-salary benefits
4. **Response to a counter-offer** that's better but not quite what you want
5. **When to stop**: signs you've reached their ceiling

Tone: confident but collaborative. I want to negotiate without burning goodwill.`,
  },

  // Creative
  {
    title: "Brainstorm 20 Ideas",
    description: "Generate a wide range of ideas from obvious to unconventional",
    category: "creative",
    optimizedFor: "both",
    tags: ["brainstorming", "ideas", "creativity"],
    promptText: `I need creative ideas for [goal or problem].

Context: [2-3 sentences of background]
Constraints: [budget / time / resources / audience / platform]
What's already been tried or is too obvious: [list if applicable]

Generate 20 ideas ranging from:
- 5 obvious/safe ideas (best versions of the conventional approach)
- 10 creative/unexpected ideas
- 5 wild/unconventional ideas (don't self-censor)

For each idea, give it:
- A punchy name
- One-sentence description
- The "twist" that makes it different

After the list, identify the top 3 with the highest potential and explain why, considering my constraints.`,
  },
  {
    title: "Story or Content Outline",
    description: "Build a compelling narrative structure for any format",
    category: "creative",
    optimizedFor: "claude",
    tags: ["story", "content", "outline", "narrative"],
    promptText: `Help me outline a [story / article / video script / podcast episode] about [topic].

Details:
- Target audience: [who will read/watch/listen]
- Desired length: [word count / duration]
- Tone: [serious / humorous / inspirational / informative / conversational]
- Goal: [what you want the audience to feel or do after]
- Format: [written article / YouTube video / podcast / short film / etc.]

Create:
1. **3 possible hooks** — opening lines or scenes that grab attention
2. **Core narrative arc** or content structure
3. **5-8 key beats or sections** with a 1-sentence description of each
4. **Character or persona details** (if applicable)
5. **The emotional journey** — how should the audience feel at each stage?
6. **3 possible endings** — and which you recommend and why
7. **5 possible titles**`,
  },

  // Business
  {
    title: "Market Research Summary",
    description: "Get a structured market analysis for any business idea",
    category: "business",
    optimizedFor: "both",
    tags: ["market research", "business", "analysis", "startup"],
    promptText: `Conduct a market analysis for [product or service idea] targeting [target customer] in [market or region].

Background: [1-2 sentences about the idea]

Include:
1. **Market size**: TAM / SAM / SOM estimates with reasoning
2. **Top 5 competitors**: name, their core value prop, and one key weakness
3. **Customer pain points**: the top 3 problems your target customer actually has
4. **Pricing analysis**: what customers currently pay for alternatives
5. **Go-to-market channels**: the 3 most effective ways to reach this customer
6. **Key risks**: the 3 biggest threats to this business succeeding
7. **Opportunity summary**: is this a good market to enter right now?

Be specific and analytical. Flag where you're estimating vs. citing known data. Avoid generic observations.`,
  },
  {
    title: "Competitor Deep Dive",
    description: "Analyze a competitor and find your positioning advantage",
    category: "business",
    optimizedFor: "both",
    tags: ["competitor analysis", "positioning", "strategy"],
    promptText: `Analyze [competitor name] as a competitive threat. I'm building [my product/service] targeting [audience].

Help me understand [competitor] across these dimensions:
1. **Value proposition**: What problem do they solve and for whom?
2. **Business model**: How do they make money? Pricing structure?
3. **Target customer**: Who actually uses them (not just who they say they target)?
4. **Strengths**: What are they genuinely good at that I should learn from?
5. **Weaknesses**: Where do they fall short — in reviews, forums, or by design?
6. **Feature gaps**: What do their customers wish they had?
7. **Positioning opportunity**: Based on this, how should I position against them?
8. **Threat level**: How likely are they to copy my approach if I succeed?

End with a one-paragraph summary of the single biggest opportunity their weaknesses create for me.`,
  },
]

async function seed() {
  console.log("Seeding prompts...")
  await db.delete(prompts)
  await db.insert(prompts).values(seedData)
  console.log(`Seeded ${seedData.length} prompts.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
