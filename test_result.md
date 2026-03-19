#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "GIG ZipFinder - Full-stack web app with purchase flow, Stripe payments, AI-powered ZIP code search, and PDF guide downloads. Deployed on Railway at www.gigzipfinder.com"

backend:
  - task: "Stripe payment integration"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Stripe live keys configured. Need to test checkout session creation in production"
  
  - task: "AI ZIP code search with LiteLLM"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Using EMERGENT_LLM_KEY. Need to verify AI responses in production"
  
  - task: "PDF guide downloads via GridFS"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Need to test guide downloads for all apps and languages"
  
  - task: "APK upload functionality"
    implemented: true
    working: "NA"
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: "NA"
        agent: "main"
        comment: "Not tested in production environment yet"
  
  - task: "Domain redirect configuration"
    implemented: true
    working: true
    file: "IONOS DNS + Railway"
    stuck_count: 2
    priority: "high"
    needs_retesting: false
    status_history:
      - working: false
        agent: "user"
        comment: "Site was completely down due to DNS conflicts"
      - working: true
        agent: "main"
        comment: "Fixed DNS configuration. www.gigzipfinder.com now working with SSL. Root domain redirects correctly"

frontend:
  - task: "Purchase flow UI"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Purchase.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Need to test complete flow from app selection to Stripe checkout"
  
  - task: "Dashboard access control"
    implemented: true
    working: true
    file: "/app/frontend/src/components/Dashboard.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Need to verify paid vs unpaid user experience"
  
  - task: "Multi-language support"
    implemented: true
    working: true
    file: "/app/frontend/src/i18n.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Need to test language switching and verify translations"
  
  - task: "Mobile responsive design"
    implemented: true
    working: true
    file: "/app/frontend/src/components/"
    stuck_count: 0
    priority: "medium"
    needs_retesting: true
    status_history:
      - working: true
        agent: "main"
        comment: "Need to verify on mobile viewport"
  
  - task: "SSL and HTTPS enforcement"
    implemented: true
    working: true
    file: "/app/frontend/public/_redirects"
    stuck_count: 1
    priority: "high"
    needs_retesting: false
    status_history:
      - working: true
        agent: "main"
        comment: "Railway handles SSL automatically. All URLs redirect to HTTPS"

metadata:
  created_by: "main_agent"
  version: "2.0"
  test_sequence: 3
  run_ui: true
  production_url: "https://www.gigzipfinder.com"

test_plan:
  current_focus:
    - "Complete purchase flow end-to-end"
    - "AI ZIP code search functionality"
    - "PDF guide downloads"
    - "Domain redirect verification"
    - "Mobile responsiveness"
  stuck_tasks: []
  test_all: true
  test_priority: "high_first"

agent_communication:
  - agent: "main"
    message: "DNS issue resolved. Site now fully accessible at www.gigzipfinder.com with SSL. Root domain (gigzipfinder.com) redirects correctly via IONOS. Ready for comprehensive production testing of all features: purchase flow, Stripe payments, AI search, PDF downloads, and APK upload. Using LIVE Stripe keys and EMERGENT_LLM_KEY."
  - agent: "main"
    message: "CRITICAL FIXES COMPLETED: 1) Updated Stripe keys - old keys were expired, new valid keys configured in Railway. 2) Fixed backend API routing - configured REACT_APP_BACKEND_URL=https://gigzipfinder-production.up.railway.app in frontend service. 3) Backend now accessible at gigzipfinder-production.up.railway.app/api/*. 4) Full purchase flow tested successfully - Stripe checkout redirection working. Ready for final comprehensive testing."
