# mechAi
# Virtual Car Mechanic Chatbot

## Project Overview

This project aims to develop a chatbot that acts as a virtual car mechanic, capable of diagnosing and troubleshooting car issues. The chatbot will leverage car manuals, service records, and maintenance guides to provide accurate diagnostics and recommendations. Additionally, the chatbot will have the functionality to check the availability of spare parts and facilitate ordering them.

## Key Tasks

### 1. Data Collection
- Gather car manuals, service records, and related documents from various sources to create a comprehensive dataset for the chatbot.

### 2. Data Processing
- Use LlamaIndex to parse and organize the collected data.
- Employ Hugging Face embeddings to prepare the data for model training.

### 3. Model Training
- Implement the Retrieval-Augmented Generation (RAG) framework with the LLaMA 3 language model (or another suitable Large Language Model) to ensure accurate diagnosis of common car problems.
- Alternatively, fine-tune the LLaMA 3 model specifically for troubleshooting car issues.

### 4. Evaluation
- Test the chatbot's diagnostic capabilities with a variety of car problems.
- Refine the model based on performance feedback to improve accuracy and reliability.

## Challenge

- Integrate functionality for the chatbot to check the availability of required spare parts.
- Facilitate the ordering of spare parts through the chatbot interface.

## Additional Notes

- The project should include a mobile interface for easy access and use.
- You are encouraged to explore and implement alternative or additional features, technologies, and tools that align with the project objectives.

## Technologies Used

- LlamaIndex for data parsing and organization.
- Hugging Face embeddings for data preparation.
- LLaMA 3 (or another suitable LLM) for model training.
- RAG Framework for enhanced diagnostic capabilities.

