/* ==========================================================================
   Aura - GCP ML Engineer Certification Quizzing API Adapter
   Realigned for the Google Cloud Professional ML Engineer Exam Guide
   ========================================================================== */

// --- Tab System: Two category sets ---
let activeTab = "ai-fluency"; // "ai-fluency" | "gcp-cert"

// General AI Fluency categories
const AI_FLUENCY_CATEGORIES = [
    {
        id: "gen-ai-llms",
        name: "Generative AI & LLMs",
        desc: "Transformers, attention mechanisms, GPT/BERT architectures, prompt engineering, RAG, fine-tuning, and RLHF.",
        icon: "🤖",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "deep-learning",
        name: "Deep Learning Fundamentals",
        desc: "Neural network architectures, backpropagation, CNNs, RNNs, LSTMs, optimization, regularization, and transfer learning.",
        icon: "🔬",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "mlops",
        name: "MLOps & Production ML",
        desc: "ML pipelines, CI/CD for ML, model versioning, experiment tracking, feature stores, monitoring, and drift detection.",
        icon: "⚙️",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "data-science",
        name: "Data Science & Statistics",
        desc: "EDA, hypothesis testing, probability distributions, A/B testing, regression, classification, clustering, and dimensionality reduction.",
        icon: "📊",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "nlp",
        name: "Natural Language Processing",
        desc: "Tokenization, embeddings, sequence models, named entity recognition, sentiment analysis, machine translation, and text generation.",
        icon: "💬",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "computer-vision",
        name: "Computer Vision",
        desc: "Image classification, object detection, segmentation, GANs, autoencoders, data augmentation, and vision transformers.",
        icon: "👁️",
        stats: "10 Qs • Easy to Expert"
    }
];

// Offline Mock Quiz Database for AI Fluency categories
const AI_FLUENCY_OFFLINE_DATA = {
    "gen-ai-llms": [
        { question: "What is the core mechanism that allows Transformer models to weigh the importance of different tokens in a sequence?", options: ["Recurrence", "Convolution", "Self-Attention", "Pooling"], answer_index: 2, explanation: "Self-attention computes a weighted sum of all positions in the sequence, allowing the model to focus on relevant tokens regardless of distance." },
        { question: "What does 'RAG' stand for in the context of LLM applications?", options: ["Rapid Attention Generation", "Retrieval-Augmented Generation", "Recursive Adaptive Gradient", "Random Access Grounding"], answer_index: 1, explanation: "RAG combines a retrieval system (fetching relevant documents) with a generative model, grounding responses in external knowledge." },
        { question: "Which technique trains a large language model to align its outputs with human preferences using a reward model?", options: ["Supervised Fine-Tuning", "RLHF (Reinforcement Learning from Human Feedback)", "Knowledge Distillation", "Pruning"], answer_index: 1, explanation: "RLHF uses human preference rankings to train a reward model, then optimizes the LLM policy via reinforcement learning (e.g., PPO)." },
        { question: "What is 'prompt engineering'?", options: ["Training a model from scratch on prompts", "The practice of crafting input instructions to elicit desired LLM outputs", "A hardware optimization technique", "A method of compressing model weights"], answer_index: 1, explanation: "Prompt engineering involves designing and iterating on the text input to guide an LLM toward producing accurate, useful responses." },
        { question: "In a Transformer, what are the three learned projections used in the attention mechanism?", options: ["Input, Output, Hidden", "Query, Key, Value", "Encoder, Decoder, Attention", "Weight, Bias, Activation"], answer_index: 1, explanation: "Each input token is projected into Query, Key, and Value vectors. Attention scores are computed as the dot product of Queries and Keys, then applied to Values." },
        { question: "What is the primary advantage of LoRA (Low-Rank Adaptation) for fine-tuning large language models?", options: ["It increases the model's total parameter count for better accuracy", "It trains only small low-rank matrices injected into layers, drastically reducing trainable parameters and memory", "It replaces the Transformer architecture with RNNs", "It removes the need for any training data"], answer_index: 1, explanation: "LoRA freezes the pretrained weights and adds small trainable low-rank decomposition matrices, enabling efficient fine-tuning with minimal compute." },
        { question: "What problem does the 'positional encoding' component solve in Transformers?", options: ["It prevents overfitting", "It injects information about token order since self-attention is permutation-invariant", "It compresses the vocabulary size", "It normalizes activation values"], answer_index: 1, explanation: "Self-attention treats input as a set (no inherent order). Positional encodings add sequence position information so the model can distinguish token order." },
        { question: "What is 'hallucination' in the context of LLMs?", options: ["When the model generates creative fiction intentionally", "When the model produces confident but factually incorrect or fabricated information", "When the model refuses to answer", "When the model repeats the same token indefinitely"], answer_index: 1, explanation: "Hallucination refers to LLMs generating plausible-sounding but factually wrong content, a major reliability challenge in production deployments." },
        { question: "You are building a customer support chatbot using an LLM. The model must answer questions strictly from your company's knowledge base and never fabricate information. Which architecture is most appropriate?", options: ["Use a vanilla pretrained LLM with temperature set to 0", "Implement RAG: retrieve relevant documents from a vector database, inject them into the prompt context, and instruct the model to answer only from provided context", "Fine-tune the LLM on the entire internet", "Use a rule-based regex system"], answer_index: 1, explanation: "RAG grounds the model's responses in retrieved documents, drastically reducing hallucination while keeping answers current with the knowledge base." },
        { question: "A company fine-tuned an LLM for legal document summarization. After deployment, users report that the model sometimes generates clauses that don't exist in the source document. The team suspects the model is relying on parametric knowledge rather than the input context. What is the best mitigation strategy?", options: ["Increase the model temperature to explore more creative outputs", "Implement a citation verification pipeline that cross-references generated text against source spans, combined with constrained decoding or RAG to anchor generation to the input", "Remove all fine-tuning and use the base model", "Add more training data from unrelated domains"], answer_index: 1, explanation: "Citation verification ensures generated content maps to source spans. Combining this with RAG or constrained decoding forces the model to ground outputs in the provided document." }
    ],
    "deep-learning": [
        { question: "What is the purpose of an activation function in a neural network?", options: ["To normalize the input data", "To introduce non-linearity so the network can learn complex patterns", "To reduce the number of parameters", "To store training data"], answer_index: 1, explanation: "Without activation functions, a neural network would be a simple linear transformation regardless of depth. Non-linearity enables learning complex decision boundaries." },
        { question: "What is 'backpropagation'?", options: ["A data augmentation technique", "The algorithm that computes gradients of the loss function with respect to each weight by applying the chain rule backward through the network", "A type of recurrent neural network", "A method for generating synthetic data"], answer_index: 1, explanation: "Backpropagation efficiently computes gradients layer by layer from output to input using the chain rule, enabling gradient-based optimization." },
        { question: "Which neural network architecture is specifically designed for processing grid-like data such as images?", options: ["Recurrent Neural Network (RNN)", "Convolutional Neural Network (CNN)", "Generative Adversarial Network (GAN)", "Autoencoder"], answer_index: 1, explanation: "CNNs use convolutional filters that slide over spatial dimensions, capturing local patterns like edges and textures — ideal for image data." },
        { question: "What is the 'vanishing gradient problem'?", options: ["When the model's accuracy vanishes during training", "When gradients become extremely small during backpropagation through many layers, causing earlier layers to learn very slowly", "When the dataset is too small", "When the GPU runs out of memory"], answer_index: 1, explanation: "In deep networks with certain activations (like sigmoid), gradients shrink exponentially as they propagate backward, making early layers nearly untrainable." },
        { question: "What technique involves using a model pretrained on a large dataset and adapting it to a new, smaller dataset?", options: ["Data Augmentation", "Transfer Learning", "Batch Normalization", "Gradient Clipping"], answer_index: 1, explanation: "Transfer learning leverages features learned from a large dataset (like ImageNet), then fine-tunes on a smaller target dataset, drastically reducing training time and data requirements." },
        { question: "What is the role of Dropout in neural network training?", options: ["It speeds up inference by removing layers", "It randomly deactivates a fraction of neurons during training to prevent co-adaptation and reduce overfitting", "It increases the learning rate", "It adds more layers to the network"], answer_index: 1, explanation: "Dropout forces the network to learn redundant representations by randomly zeroing neurons, acting as an ensemble regularizer." },
        { question: "Which optimizer adapts the learning rate for each parameter individually based on historical gradients?", options: ["Stochastic Gradient Descent (SGD)", "Adam (Adaptive Moment Estimation)", "Linear Regression Solver", "K-Means"], answer_index: 1, explanation: "Adam combines momentum (first moment) and RMSProp (second moment) to adapt per-parameter learning rates, achieving fast and stable convergence." },
        { question: "What is Batch Normalization?", options: ["A technique to normalize the dataset before training", "A layer that normalizes activations within each mini-batch during training, stabilizing and accelerating convergence", "A method to increase batch size", "A loss function"], answer_index: 1, explanation: "Batch Normalization normalizes layer inputs to have zero mean and unit variance per mini-batch, reducing internal covariate shift and enabling higher learning rates." },
        { question: "You train a CNN on a medical imaging dataset with 500 labeled images. The training accuracy reaches 99% but validation accuracy plateaus at 62%. What is the most likely issue and best remedy?", options: ["The model is underfitting — add more layers", "The model is overfitting — apply data augmentation, dropout, and consider transfer learning from a pretrained model", "The learning rate is too low", "The dataset labels are correct but the images are too high-resolution"], answer_index: 1, explanation: "A large gap between train and validation accuracy signals overfitting. With limited data, transfer learning and augmentation are the most effective remedies." },
        { question: "You are training a 50-layer ResNet and notice that increasing depth beyond 20 layers degraded accuracy in your earlier plain networks. What architectural innovation in ResNet solves this?", options: ["Using larger convolution filters", "Skip (residual) connections that add the input of a block to its output, enabling gradient flow and identity mapping", "Replacing all convolutions with fully connected layers", "Using a single very wide layer instead"], answer_index: 1, explanation: "Residual connections allow gradients to flow directly through skip paths, solving the degradation problem and enabling training of very deep networks." }
    ],
    "mlops": [
        { question: "What does MLOps stand for?", options: ["Machine Learning Optimization", "Machine Learning Operations", "Model Logic Operations", "Multi-Layer Operations"], answer_index: 1, explanation: "MLOps (Machine Learning Operations) applies DevOps principles to ML systems, covering the end-to-end lifecycle from development to production monitoring." },
        { question: "What is 'model drift' in a production ML system?", options: ["When the model file gets corrupted", "When the model's performance degrades over time because the real-world data distribution shifts from what the model was trained on", "When the model takes longer to train", "When the model gets physically moved to a different server"], answer_index: 1, explanation: "Model drift occurs when the statistical properties of production data diverge from training data, causing prediction quality to degrade." },
        { question: "What is a Feature Store?", options: ["A retail store selling ML features", "A centralized platform to define, store, and serve ML features consistently across training and inference", "A database for storing model weights", "A UI framework for ML dashboards"], answer_index: 1, explanation: "Feature stores ensure training and serving use identical feature definitions, preventing training-serving skew and enabling feature reuse across teams." },
        { question: "Which practice involves automatically retraining and deploying ML models when new data or code changes are detected?", options: ["Manual deployment", "CI/CD for ML (Continuous Training)", "Data labeling", "Feature selection"], answer_index: 1, explanation: "CI/CD for ML extends traditional CI/CD to include continuous training pipelines triggered by data or code changes, ensuring models stay current." },
        { question: "What is an ML Pipeline?", options: ["A physical pipe used in data centers", "An automated sequence of steps (data ingestion, preprocessing, training, evaluation, deployment) that produces a trained model", "A single Python script", "A type of neural network"], answer_index: 1, explanation: "ML pipelines orchestrate reproducible workflows where each step's output feeds the next, enabling automation, versioning, and auditability." },
        { question: "What is the purpose of experiment tracking tools like MLflow or Weights & Biases?", options: ["To track employee work hours", "To log hyperparameters, metrics, artifacts, and code versions for each training run so experiments are reproducible and comparable", "To monitor server CPU usage", "To generate training data"], answer_index: 1, explanation: "Experiment tracking records every aspect of a training run, enabling reproducibility, comparison, and audit trails across experiments." },
        { question: "What is 'training-serving skew'?", options: ["When the training loss is skewed", "A discrepancy between how features are computed during training vs. during production inference, leading to degraded model performance", "When the model serves predictions too slowly", "When training data is imbalanced"], answer_index: 1, explanation: "Training-serving skew occurs when feature engineering logic differs between training and serving pipelines, causing the model to receive unexpected inputs in production." },
        { question: "What is a 'Shadow Deployment' strategy?", options: ["Deploying a model in a dark data center", "Running a new model in parallel with production, feeding it real traffic and logging predictions without serving them to users", "Removing the old model immediately", "Training a model with no labels"], answer_index: 1, explanation: "Shadow deployments let you evaluate a new model on live traffic without risk — predictions are logged for comparison but not returned to users." },
        { question: "Your ML model in production suddenly drops from 92% to 74% accuracy over 2 weeks. Logs show no code changes. What is the most likely cause and how should you investigate?", options: ["The GPU degraded — replace the hardware", "Data drift — analyze the statistical distribution of recent input features compared to the training data baseline, and check for upstream data pipeline changes", "The model spontaneously forgot its weights", "Users are sending fewer requests"], answer_index: 1, explanation: "Gradual accuracy degradation without code changes strongly suggests data drift. Feature distribution monitoring and upstream pipeline audits identify the root cause." },
        { question: "You manage 15 ML models in production across 4 teams. Each team has different training frameworks, deployment scripts, and monitoring setups. What organizational approach best reduces operational risk?", options: ["Let each team manage their own infrastructure independently", "Establish a shared ML platform with standardized pipelines, a model registry, unified monitoring dashboards, and deployment templates — while allowing teams to customize training code", "Rewrite all models in a single framework", "Hire one person to manually deploy all models"], answer_index: 1, explanation: "A shared ML platform standardizes the operational layer (deployment, monitoring, registry) while preserving flexibility in training, reducing silos and operational risk." }
    ],
    "data-science": [
        { question: "What is the primary goal of Exploratory Data Analysis (EDA)?", options: ["To deploy models to production", "To summarize, visualize, and understand the main characteristics and patterns of a dataset before modeling", "To tune hyperparameters", "To write unit tests"], answer_index: 1, explanation: "EDA helps analysts understand distributions, detect outliers, find patterns, and form hypotheses — essential before building any model." },
        { question: "What does a p-value represent in hypothesis testing?", options: ["The probability that the null hypothesis is true", "The probability of observing data at least as extreme as the actual results, assuming the null hypothesis is true", "The accuracy of the model", "The percentage of missing data"], answer_index: 1, explanation: "The p-value quantifies how likely the observed results would be under the null hypothesis. A small p-value suggests evidence against the null." },
        { question: "What is the difference between supervised and unsupervised learning?", options: ["Supervised learning uses GPUs; unsupervised uses CPUs", "Supervised learning uses labeled data to learn a mapping; unsupervised learning discovers patterns in unlabeled data", "There is no difference", "Supervised learning is faster"], answer_index: 1, explanation: "Supervised learning trains on input-output pairs (labels), while unsupervised learning finds hidden structure (clusters, associations) without labels." },
        { question: "What is the 'bias-variance tradeoff'?", options: ["A tradeoff between training speed and accuracy", "The balance between a model's tendency to underfit (high bias) and its tendency to overfit (high variance)", "A tradeoff between CPU and GPU usage", "The balance between data size and model size"], answer_index: 1, explanation: "High bias means the model is too simple (underfitting); high variance means it's too sensitive to training data (overfitting). Good models balance both." },
        { question: "Which technique is used to evaluate a model's performance by splitting the data into k subsets and training/testing k times?", options: ["Bootstrap Sampling", "K-Fold Cross-Validation", "Random Search", "Gradient Descent"], answer_index: 1, explanation: "K-fold cross-validation trains on k-1 folds and tests on the held-out fold, rotating through all k folds to produce a robust performance estimate." },
        { question: "What is multicollinearity and why is it problematic in linear regression?", options: ["When the target variable has multiple classes", "When independent variables are highly correlated with each other, making coefficient estimates unstable and difficult to interpret", "When the dataset has many columns", "When there are missing values"], answer_index: 1, explanation: "Multicollinearity inflates coefficient variance, making individual feature contributions unreliable and p-values misleading in linear models." },
        { question: "What is the purpose of Principal Component Analysis (PCA)?", options: ["To increase the number of features", "To reduce dimensionality by projecting data onto orthogonal axes (principal components) that capture maximum variance", "To classify data into categories", "To handle missing values"], answer_index: 1, explanation: "PCA finds directions of maximum variance and projects data onto fewer dimensions while preserving as much information as possible." },
        { question: "In an A/B test, what is a Type I error?", options: ["Failing to detect a real effect", "Concluding there is a significant effect when in reality there is none (false positive)", "Running the test for too long", "Having too small a sample size"], answer_index: 1, explanation: "Type I error (false positive) means rejecting the null hypothesis when it's actually true — concluding a difference exists when it doesn't." },
        { question: "You run an A/B test for a new recommendation algorithm. After 2 days, the p-value drops below 0.05. Your manager wants to declare the test a success and ship immediately. What is the statistical concern?", options: ["The p-value is too low", "Peeking at results before the pre-determined sample size is reached inflates false positive rates (multiple comparisons / optional stopping problem)", "2 days is too long for an A/B test", "The recommendation algorithm is too fast"], answer_index: 1, explanation: "Repeatedly checking p-values and stopping early when significant (peeking) inflates Type I error rates. Tests must run to the pre-planned sample size." },
        { question: "You are building a churn prediction model. Your dataset has 95% non-churners and 5% churners. A model predicting 'no churn' for everyone achieves 95% accuracy. How should you properly evaluate and handle this?", options: ["Accept 95% accuracy as excellent", "Use Precision, Recall, F1, and PR-AUC as primary metrics instead of accuracy. Apply techniques like SMOTE, class weighting, or stratified sampling to address the imbalance", "Remove all non-churner examples to balance the dataset 50/50", "Use unsupervised clustering instead"], answer_index: 1, explanation: "With extreme class imbalance, accuracy is misleading. PR-AUC and F1 focus on the minority class. Resampling or weighting helps the model learn the minority pattern." }
    ],
    "nlp": [
        { question: "What is tokenization in NLP?", options: ["Converting text to images", "The process of breaking text into smaller units (tokens) like words, subwords, or characters", "Encrypting text data", "Removing stop words"], answer_index: 1, explanation: "Tokenization is the first step in NLP pipelines, splitting raw text into discrete units that models can process as numerical inputs." },
        { question: "What are word embeddings?", options: ["Physical word cards embedded in hardware", "Dense vector representations of words where semantically similar words have similar vectors", "A type of recurrent neural network", "A data storage format"], answer_index: 1, explanation: "Word embeddings (like Word2Vec, GloVe) map words to continuous vector spaces where geometric proximity reflects semantic similarity." },
        { question: "What is the key innovation of the Transformer architecture compared to RNNs?", options: ["It uses recurrence for sequential processing", "It processes all tokens in parallel using self-attention, eliminating sequential bottlenecks", "It uses smaller vocabularies", "It requires less training data"], answer_index: 1, explanation: "Unlike RNNs that process tokens sequentially, Transformers use self-attention to relate all positions simultaneously, enabling massive parallelization." },
        { question: "What is Named Entity Recognition (NER)?", options: ["A text generation technique", "The task of identifying and classifying named entities (persons, organizations, locations, dates) in text", "A method for translating languages", "A tokenization algorithm"], answer_index: 1, explanation: "NER extracts structured information from unstructured text by locating and categorizing entities into predefined classes." },
        { question: "What does BERT stand for, and what makes it different from GPT?", options: ["Binary Encoding for Recurrent Transformers; it uses RNNs", "Bidirectional Encoder Representations from Transformers; it reads text in both directions, while GPT is unidirectional (left-to-right)", "Basic Embedding Retrieval Tool; it's a search engine", "Batch Encoded Representation Technique; it processes batches faster"], answer_index: 1, explanation: "BERT uses bidirectional self-attention (seeing both left and right context), making it excel at understanding tasks. GPT uses causal (left-to-right) attention, suited for generation." },
        { question: "What is the purpose of the 'attention mask' in Transformer models?", options: ["To visualize attention weights", "To indicate which tokens are real content vs. padding, preventing the model from attending to padding tokens", "To compress the model", "To generate images from text"], answer_index: 1, explanation: "Attention masks are binary tensors that mark valid tokens (1) and padding tokens (0), ensuring padded positions don't influence attention computations." },
        { question: "What is 'beam search' in text generation?", options: ["A laser-based text scanner", "A decoding strategy that maintains the top-k most probable partial sequences at each step, exploring multiple generation paths", "A training algorithm", "A data preprocessing method"], answer_index: 1, explanation: "Beam search keeps k candidate sequences (beams) and expands each at every step, selecting the overall highest-probability complete sequence." },
        { question: "What is the difference between 'semantic similarity' and 'lexical similarity'?", options: ["They are the same thing", "Lexical similarity compares exact word overlap; semantic similarity measures meaning closeness even with different words", "Semantic similarity is always more accurate", "Lexical similarity uses neural networks"], answer_index: 1, explanation: "'Happy' and 'joyful' have low lexical but high semantic similarity. Embeddings and sentence transformers capture semantic closeness beyond surface-level word matching." },
        { question: "You need to build a multilingual sentiment classifier for 12 languages with limited labeled data per language. What approach is most efficient?", options: ["Train 12 separate monolingual models from scratch", "Fine-tune a multilingual pretrained model (like XLM-RoBERTa) on the combined labeled data, leveraging cross-lingual transfer", "Use rule-based keyword matching for each language", "Translate all data to English and use an English-only model"], answer_index: 1, explanation: "Multilingual pretrained models learn cross-lingual representations. Fine-tuning on combined data lets knowledge transfer across languages, even with sparse per-language labels." },
        { question: "You deploy a text summarization model. Users report it sometimes copies sensitive PII (names, emails, phone numbers) from source documents into summaries shared with broader audiences. How do you address this systematically?", options: ["Tell users to manually redact summaries", "Add a post-processing NER-based PII detection and redaction layer that scrubs identified entities from generated summaries before they are returned", "Reduce the model's context window", "Switch to extractive summarization only"], answer_index: 1, explanation: "A PII detection pipeline (using NER + regex patterns) as a post-processing guard ensures sensitive information is redacted before summaries reach users, regardless of generation method." }
    ],
    "computer-vision": [
        { question: "What is the primary operation performed by a convolutional layer in a CNN?", options: ["Matrix inversion", "Element-wise multiplication of a learned filter (kernel) sliding across the input, producing a feature map", "Random sampling of pixels", "Sorting pixel values"], answer_index: 1, explanation: "Convolutional layers apply learned filters that detect local patterns (edges, textures) by computing dot products as the kernel slides over the input spatially." },
        { question: "What is the purpose of pooling layers (e.g., Max Pooling) in CNNs?", options: ["To add more parameters to the model", "To reduce spatial dimensions while retaining important features, decreasing computation and providing translation invariance", "To generate new training images", "To convert images to text"], answer_index: 1, explanation: "Pooling reduces feature map dimensions by taking the max (or average) over local regions, making the representation more compact and somewhat invariant to small translations." },
        { question: "What is data augmentation in computer vision?", options: ["Collecting more images from the internet", "Applying transformations (rotation, flipping, cropping, color jittering) to existing images to artificially increase training set diversity", "Increasing image resolution", "Removing duplicate images"], answer_index: 1, explanation: "Data augmentation creates varied versions of training images, helping the model generalize better and reducing overfitting, especially with limited data." },
        { question: "What is the difference between object detection and image classification?", options: ["They are the same task", "Classification assigns a single label to the whole image; detection locates and classifies multiple objects with bounding boxes within the image", "Detection is faster", "Classification works on videos only"], answer_index: 1, explanation: "Classification answers 'what is in this image?' while detection answers 'what objects are where?' by predicting bounding box coordinates and class labels for each object." },
        { question: "What is a GAN (Generative Adversarial Network)?", options: ["A classification model", "A framework with two networks — a generator that creates data and a discriminator that evaluates it — trained adversarially against each other", "A type of pooling layer", "A data augmentation library"], answer_index: 1, explanation: "GANs pit a generator (creating realistic samples) against a discriminator (distinguishing real from fake) in a minimax game, producing high-quality synthetic data." },
        { question: "What is 'semantic segmentation'?", options: ["Splitting an image into equal rectangular patches", "Assigning a class label to every single pixel in an image", "Detecting the edges of objects", "Compressing images for storage"], answer_index: 1, explanation: "Semantic segmentation classifies each pixel into a category (road, sky, person), producing a dense per-pixel label map of the entire image." },
        { question: "What is a Vision Transformer (ViT)?", options: ["A CNN with more layers", "A model that splits an image into fixed-size patches, linearly embeds them, and processes the sequence with a standard Transformer encoder", "A rule-based image filter", "A video compression algorithm"], answer_index: 1, explanation: "ViT treats an image as a sequence of patch embeddings and applies Transformer self-attention, achieving competitive or superior performance to CNNs on large datasets." },
        { question: "What is the role of 'anchor boxes' in object detection models like YOLO or Faster R-CNN?", options: ["They anchor the model to a specific GPU", "They are predefined bounding box templates of various aspect ratios that the model refines to predict actual object locations", "They prevent overfitting", "They are used for image augmentation"], answer_index: 1, explanation: "Anchor boxes provide shape priors. The model predicts offsets from these anchors rather than absolute coordinates, making bounding box regression more stable." },
        { question: "You are building a quality inspection system for a manufacturing line. Defective products represent only 0.1% of images. Most defects are subtle scratches barely visible to the human eye. What approach would you take?", options: ["Train a standard classifier on the imbalanced dataset", "Use anomaly detection with an autoencoder trained on normal images, flagging high reconstruction error as defects. Supplement with focal loss classification if labeled defect data exists", "Only use rule-based edge detection", "Downsample normal images to 0.1% to match defect count"], answer_index: 1, explanation: "Autoencoders learn the distribution of 'normal' and flag anomalies via high reconstruction error. This works well with extreme class imbalance and subtle defects." },
        { question: "You deploy a real-time object detection model on edge devices in autonomous vehicles. The model runs at 15 FPS but the safety requirement is 30 FPS minimum. Accuracy cannot drop below 85% mAP. How do you optimize?", options: ["Simply reduce input resolution to 64x64 pixels", "Apply model optimization: quantization (INT8/FP16), knowledge distillation to a smaller architecture, TensorRT compilation, and profile to find the inference bottleneck (pre-processing vs. model vs. post-processing)", "Buy faster edge hardware only", "Switch to a cloud-based inference endpoint"], answer_index: 1, explanation: "A systematic optimization pipeline — quantization, distillation, compilation, and profiling — targets the specific bottleneck. Edge deployment demands hardware-aware optimization rather than brute-force solutions." }
    ]
};

// Get active categories based on selected tab
function getActiveCategories() {
    return activeTab === "ai-fluency" ? AI_FLUENCY_CATEGORIES : GCP_CATEGORIES;
}

// For backward compatibility - AI_CATEGORIES is now dynamic
function get_AI_CATEGORIES() {
    return getActiveCategories();
}

// Real-aligned categories representing the 6 core domains of the GCP ML Engineer Exam Guide
const GCP_CATEGORIES = [
    {
        id: "ml-problem-framing",
        name: "ML Problem Framing",
        desc: "Translate business challenges into ML tasks, define evaluation metrics, assess feasibility, and identify bias risks.",
        icon: "🎯",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "ml-solution-architecture",
        name: "ML Solution Architecture",
        desc: "Design scalable cloud architectures. Select compute (CPU/GPU/TPU), AutoML vs. Custom, BQML, and edge deployment.",
        icon: "🏗️",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "data-prep-processing",
        name: "Data Prep & Processing",
        desc: "Build scalable ingestion and processing pipelines using Dataflow, Dataproc, BigQuery, and Vertex AI Feature Store.",
        icon: "🗄️",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "model-development",
        name: "Model Development",
        desc: "Train models with Custom Containers, BQML, or AutoML. Optimize with Vizier hyperparameter tuning.",
        icon: "🧠",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "ml-pipeline-orchestration",
        name: "ML Pipeline Orchestration",
        desc: "Automate ML lifecycles using Vertex AI Pipelines (Kubeflow/TFX), Model Registry, Metadata, and CI/CD.",
        icon: "⚙️",
        stats: "10 Qs • Easy to Expert"
    },
    {
        id: "serving-monitoring-ethics",
        name: "Serving, Monitoring & Ethics",
        desc: "Deploy online/batch prediction endpoints, monitor drift/skew, explain predictions with Vertex Explainable AI, and apply responsible AI policies.",
        icon: "⚖️",
        stats: "10 Qs • Easy to Expert"
    }
];

// Offline Mock Quiz Database (10 questions per category, sorted strictly from Q1 Easiest to Q10 Expert Scenario)
const OFFLINE_QUIZ_DATA = {
    "ml-problem-framing": [
        {
            question: "Which type of machine learning task is most appropriate for predicting the dollar value of a home based on its square footage, bedrooms, and zip code?",
            options: [
                "Binary Classification",
                "Clustering",
                "Regression",
                "Anomaly Detection"
            ],
            answer_index: 2,
            explanation: "Predicting a continuous numerical value (like a home's price) is framed as a Regression task."
        },
        {
            question: "Why is Accuracy a poor metric to prioritize when training a model to detect extremely rare events, such as credit card fraud representing 0.01% of all transactions?",
            options: [
                "Accuracy is mathematically incompatible with regularization.",
                "A naive model that predicts 'Not Fraud' for every transaction achieves 99.99% accuracy but fails to catch any fraud.",
                "Accuracy cannot be calculated on tabular data.",
                "Accuracy requires symmetric class labels of float types."
            ],
            answer_index: 1,
            explanation: "In highly imbalanced datasets, accuracy can be misleading because a baseline model predicting only the majority class achieves high accuracy while failing to detect any targets."
        },
        {
            question: "You are designing a recommendation system for a video streaming platform. Which metric represents explicit user feedback?",
            options: [
                "A user clicking a video thumbnail.",
                "A user watching a video to completion.",
                "A user giving a video a thumbs-up rating.",
                "A user hovering over a video player."
            ],
            answer_index: 2,
            explanation: "Thumbs-up is explicit feedback (active user evaluation), whereas clicks, watch time, and hovers are implicit feedback (inferred user interest)."
        },
        {
            question: "A company wants to predict customer churn. The cost of missing a churn risk (False Negative) is very high, while the cost of sending an email coupon to a loyal customer (False Positive) is minimal. Which metric should you optimize?",
            options: [
                "Precision",
                "Recall",
                "Mean Absolute Error",
                "Specificity"
            ],
            answer_index: 1,
            explanation: "Recall measures the proportion of actual positive cases identified. Optimizing Recall minimizes False Negatives, which aligns with the high cost of missing churn risks."
        },
        {
            question: "Under what scenario would it be inappropriate to frame a business problem as a machine learning task?",
            options: [
                "When you have millions of labelled historical data points.",
                "When the rules governing the decision are dynamic and change frequently.",
                "When the decision-making process must follow a strict, static, and transparent set of deterministic business rules.",
                "When the target variable is continuous."
            ],
            answer_index: 2,
            explanation: "If a decision relies on static, transparent deterministic rules, standard programming logic is simpler, faster, and more auditable than an ML model."
        },
        {
            question: "You want to target high-probability buyers for a marketing campaign. Your budget is tight, so you want to ensure that those you predict as 'buyers' actually purchase. Which metric should you optimize?",
            options: [
                "Recall",
                "Precision",
                "F1 Score",
                "Log Loss"
            ],
            answer_index: 1,
            explanation: "Precision (TP / (TP + FP)) measures the accuracy of positive predictions. Optimizing Precision minimizes False Positives (spending marketing budget on non-buyers)."
        },
        {
            question: "A medical imaging start-up is building a classifier to detect lung nodules from X-rays. Missing a nodule (False Negative) has critical consequences. Flagging a benign area (False Positive) results in a quick secondary check. What threshold adjustment should you make?",
            options: [
                "Increase the classification threshold to make the model more conservative in predicting nodules.",
                "Decrease the classification threshold to make the model more sensitive in predicting nodules.",
                "Keep the threshold at 0.5 and apply L1 regularization.",
                "Increase the training learning rate to force convergence."
            ],
            answer_index: 1,
            explanation: "Lowering the decision threshold (e.g., from 0.5 to 0.2) increases sensitivity, capturing more true positive nodules (maximizing Recall) at the cost of more false alarms."
        },
        {
            question: "You need to frame an ML solution to forecast monthly demand for 10,000 retail items across 100 stores. Sales are highly seasonal, and some products have sparse sales data. Which framing is most suitable?",
            options: [
                "Train 1,000,000 separate linear regression models, one for each product-store pair.",
                "Frame as a time-series forecasting problem using Vertex AI Forecasting, incorporating covariates like promotions and holidays.",
                "Frame as an unsupervised clustering problem to group products by monthly sales volumes.",
                "Frame as a collaborative filtering recommendation task."
            ],
            answer_index: 1,
            explanation: "Vertex AI Forecasting manages multi-series demand forecasting with covariates (promotions, holidays) and handles sparse product-store sales efficiently."
        },
        {
            question: "A bank wants to deploy a real-time transaction fraud model. Fraud accounts for 0.05% of all events. The business demands that false declines affect less than 1% of legitimate users, while catching as much fraud as possible. How should you frame the model evaluation?",
            options: [
                "Train the model to maximize accuracy, aiming for at least 99.9% overall accuracy.",
                "Optimize Precision-Recall AUC, and select a threshold that guarantees Precision >= 99% for the 'Legitimate' class while maximizing Recall for the 'Fraud' class.",
                "Frame as a multi-class classification and optimize macro F1 score.",
                "Optimize Mean Squared Error at the transaction amount level."
            ],
            answer_index: 1,
            explanation: "By maximizing fraud Recall subject to a strict lower limit on legitimate Precision (minimizing false declines), you satisfy the business constraints in imbalanced settings."
        },
        {
            question: "You are framing a model to predict user engagement for a news app. You have implicit clicks and reading durations. The model must return recommendations in sub-50ms. Which design is best?",
            options: [
                "Frame as a deep sequence-to-sequence model that processes the user's complete history on every request.",
                "Frame as a two-stage pipeline: retrieve candidates using matrix factorization, then rank them with a deep neural network using implicit features.",
                "Frame as a single-stage clustering algorithm that groups articles daily.",
                "Frame as a linear regression model that predicts reading duration directly from raw article text."
            ],
            answer_index: 1,
            explanation: "A two-stage pipeline separates candidate retrieval (reducing millions of items to hundreds in sub-10ms) from heavy ranking (scoring the top candidates), meeting strict latency goals."
        }
    ],
    "ml-solution-architecture": [
        {
            question: "When should you choose Google Cloud AutoML over Custom Training on Vertex AI?",
            options: [
                "When you need to define custom neural network layers.",
                "When you have limited ML expertise, want to establish a quick baseline, and have a standard tabular, image, or text dataset.",
                "When you want to deploy a model using PyTorch on GPUs.",
                "When you want to train a model without paying for compute."
            ],
            answer_index: 1,
            explanation: "AutoML is designed for rapid development. It automatically handles feature engineering, architecture search, and training for standard datasets with minimal code."
        },
        {
            question: "Which Google Cloud hardware accelerator is custom-designed by Google to accelerate matrix math operations inside neural network workloads?",
            options: [
                "NVIDIA H100 GPU",
                "Intel Xeon CPU",
                "Tensor Processing Unit (TPU)",
                "AMD EPYC Processor"
            ],
            answer_index: 2,
            explanation: "TPUs (Tensor Processing Units) are Google's custom ASICs optimized specifically for the matrix multiplication workloads common in deep learning."
        },
        {
            question: "What is the primary architectural advantage of using BigQuery ML (BQML) for training machine learning models?",
            options: [
                "It automatically converts models to run on mobile devices.",
                "It enables training models directly on structured data inside BigQuery using SQL, eliminating data export overhead.",
                "It is the only GCP service that supports PyTorch model architectures.",
                "It runs models on Edge devices without any network access."
            ],
            answer_index: 1,
            explanation: "BQML eliminates the need to export massive datasets from BigQuery to an external training environment, reducing data transfer costs, security risks, and pipeline steps."
        },
        {
            question: "You want to deploy a pretrained LLM (such as Llama 3) on Vertex AI. What is the easiest starting point to find, customize, and deploy this model on GCP?",
            options: [
                "Vertex AI Feature Store",
                "Vertex AI Model Garden",
                "Dataproc Metastore",
                "Vertex AI Workbench User-Managed Notebooks"
            ],
            answer_index: 1,
            explanation: "Vertex AI Model Garden is a curated repository of open-source and Google-proprietary foundation models, offering simple one-click deployment templates."
        },
        {
            question: "You are designing an ML application for a smart camera that operates in a remote area with unstable internet connections. Where should inference occur?",
            options: [
                "On a centralized Vertex AI Prediction Endpoint.",
                "On the Edge device using a compiled model format like TensorFlow Lite.",
                "Using BigQuery ML queries run periodically.",
                "On a Dataproc cluster running Spark Streaming."
            ],
            answer_index: 0, // Wait, remote area with unstable internet!
            // Wait, option 1 says "On a centralized Vertex AI Prediction Endpoint" (incorrect).
            // Option 2 says "On the Edge device using a compiled model format like TensorFlow Lite." (correct).
            // Let's make sure the option index matches option 1 (0-indexed). Yes! Index 1 is correct.
            options: [
                "On a centralized Vertex AI Prediction Endpoint.",
                "On the Edge device using a compiled model format like TensorFlow Lite.",
                "Using BigQuery ML queries run periodically.",
                "On a Dataproc cluster running Spark Streaming."
            ],
            answer_index: 1,
            explanation: "Edge deployment using compiled, compressed models (TF Lite) allows low-latency local inference without requiring internet connectivity."
        },
        {
            question: "You need to train a custom deep learning model on a tabular dataset of 5 TB. The model requires custom loss functions. Which training strategy should you select?",
            options: [
                "Use BigQuery ML Logistic Regression.",
                "Create a Vertex AI Custom Training job using a distributed TensorFlow container running on a GPU cluster.",
                "Use Vertex AI AutoML Tabular.",
                "Run a single Jupyter notebook locally on Vertex AI Workbench."
            ],
            answer_index: 1,
            explanation: "Custom training with distributed containers on Vertex AI handles large datasets (5 TB) and custom loss functions, scaling across multiple GPUs."
        },
        {
            question: "You are architecting an ML pipeline for real-time click-through rate prediction. Inference must occur within 20ms of a user loading a page. What architecture should you choose?",
            options: [
                "Run a batch prediction job every hour and cache results in BigQuery.",
                "Deploy the model to a Vertex AI Endpoint with autoscaling, and fetch real-time features from a low-latency cache like Vertex AI Feature Store.",
                "Query the raw data from Cloud Storage on every request using a Dataproc server.",
                "Run an AutoML training job on every user click."
            ],
            answer_index: 1,
            explanation: "Vertex AI Endpoints provide low-latency online serving, and pairing them with a feature store ensures pre-computed online features are retrieved in milliseconds."
        },
        {
            question: "A company trains a TensorFlow model using 100 TB of images. The model training takes 3 days on 8 GPUs. To reduce costs and training time, how should you architect the cluster?",
            options: [
                "Switch to CPU-only VMs on Compute Engine and run training in parallel.",
                "Use a Vertex AI Custom Training job configured with a TPU v5e pod slice and pipeline data ingestion using tf.data and TFRecord files on Cloud Storage.",
                "Copy the 100 TB dataset directly to the GPU local boot disk on every training restart.",
                "Train the model using BigQuery ML's K-means clustering."
            ],
            answer_index: 1,
            explanation: "TPU pods accelerate large-scale neural network training. Optimizing ingestion with `tf.data` and TFRecord files prevents data loading bottlenecks from stalling the TPU."
        },
        {
            question: "You are designing an ML architecture for a global bank that has strict data residency regulations: customer data cannot leave Europe, but the ML team is in the US. How do you design this?",
            options: [
                "Export data to US-based Cloud Storage buckets, but encrypt the datasets.",
                "Set up a Vertex AI Workbench and custom training pipelines restricted to the `europe-west3` region, utilizing IAM controls to prevent data egress.",
                "Train the model locally in the US on mock data and deploy it in Europe without testing.",
                "Use AutoML in the `us-central1` region, since AutoML anonymizes datasets automatically."
            ],
            answer_index: 1,
            explanation: "Restricting the storage, Workbench, and Training resources to a specific European region (e.g., europe-west3) guarantees regulatory compliance for data residency."
        },
        {
            question: "You are designing the serving architecture for a model that classifies documents. The model size is 15 GB, and traffic is highly spiky: thousands of requests at 9 AM, but zero traffic at night. How can you minimize serving costs without failing requests?",
            options: [
                "Deploy to a Vertex AI Endpoint with min-nodes set to 0, utilizing a custom container with cold-start optimization, and set up Cloud Pub/Sub to queue incoming spikes.",
                "Deploy to a single non-autoscaling Compute Engine VM that remains active 24/7.",
                "Perform batch prediction only, processing documents in a single queue once every 24 hours.",
                "Set up a BigQuery ML endpoint running on an active Dataprocessor."
            ],
            answer_index: 0,
            explanation: "Allowing the node count to scale to 0 avoids costs when traffic is non-existent. Queuing requests via Pub/Sub ensures spiky traffic doesn't drop during cold starts."
        }
    ],
    "data-prep-processing": [
        {
            question: "Which Google Cloud service is a fully managed, serverless stream and batch data processing service based on Apache Beam?",
            options: [
                "Cloud Dataflow",
                "Cloud Dataproc",
                "BigQuery ML",
                "Cloud Dataprep"
            ],
            answer_index: 0,
            explanation: "Cloud Dataflow runs Apache Beam pipelines for serverless, unified batch and stream data processing."
        },
        {
            question: "What is the primary role of the Vertex AI Feature Store?",
            options: [
                "To store raw PDF documents for training.",
                "To catalog, share, and serve machine learning features consistently across training and real-time inference.",
                "To run hyperparameter tuning jobs on tabular data.",
                "To visualize neural network activation weights."
            ],
            answer_index: 1,
            explanation: "Vertex AI Feature Store provides a centralized repository to share, version, and serve features, avoiding training-serving skew by using the same feature definitions."
        },
        {
            question: "You want to perform exploratory data analysis (EDA) on a 10 GB dataset stored in BigQuery. What is the most efficient GCP workflow?",
            options: [
                "Download the dataset as a CSV file to your local computer and use pandas.",
                "Launch a Vertex AI Workbench notebook, query BigQuery using SQL with the BigQuery client library, and analyze subsets using standard libraries.",
                "Write a Dataflow pipeline to convert the data into JPEG images.",
                "Use Dataproc to export the data to Cloud SQL."
            ],
            answer_index: 1,
            explanation: "Vertex AI Workbench notebooks integrate natively with BigQuery. Querying data using SQL returns filtered, manageable results directly into your notebook memory."
        },
        {
            question: "Your raw dataset contains missing values in a critical numerical feature. You want to train a model that cannot handle missing values. What is a standard imputation best practice?",
            options: [
                "Delete all rows containing missing values, even if it removes 50% of the dataset.",
                "Replace missing values with the mean or median of that feature calculated from the training split only.",
                "Replace missing values with the mean calculated across the entire dataset (train, validation, and test splits combined).",
                "Set all missing values to random float numbers."
            ],
            answer_index: 1,
            explanation: "Imputation statistics must be calculated from the training set only and then applied to validation and test splits to prevent data leakage."
        },
        {
            question: "You are training a model on images stored in Cloud Storage. The training job bottlenecks because copying images from Cloud Storage to the VM during training is slow. How should you format the dataset?",
            options: [
                "Convert all images to high-resolution PNGs and zip them.",
                "Pre-process images into TFRecord files and stream them using the `tf.data` API.",
                "Store images in a relational database like Cloud Spanner.",
                "Export images as text strings into a BigQuery table."
            ],
            answer_index: 1,
            explanation: "TFRecords package binary data into sequential blocks, reducing disk seek overhead. Combining this with `tf.data` pipelines allows efficient streaming and prefetching."
        },
        {
            question: "A streaming data pipeline receives IoT data from Cloud Pub/Sub. You need to calculate sliding window averages of sensor values and write them to BigQuery for real-time anomaly detection. Which tool should you use?",
            options: [
                "Cloud Composer running hourly Python scripts.",
                "Cloud Dataflow running an Apache Beam streaming pipeline with windowing functions.",
                "BigQuery scheduled SQL queries running every second.",
                "A Dataproc cluster running Apache Spark Batch jobs."
            ],
            answer_index: 1,
            explanation: "Dataflow handles out-of-order data and streaming aggregations using windowing mechanisms, writing processed features to BigQuery with low latency."
        },
        {
            question: "You want to feed categorical features (like 'city' or 'department') into a linear model. What preprocessing step is required?",
            options: [
                "Normalize the strings to have a mean of 0 and variance of 1.",
                "Apply One-Hot Encoding or Target Encoding to map categorical values to numeric vectors.",
                "Convert string values to their corresponding ASCII integers.",
                "Apply Principal Component Analysis directly to the raw strings."
            ],
            answer_index: 1,
            explanation: "Linear models require numerical inputs. One-hot encoding converts categorical variables into binary columns (1s and 0s), allowing the model to compute weights."
        },
        {
            question: "You are training an ML model using a 100 TB tabular dataset. You need to perform complex feature engineering (joins, aggregations, scaling) before training. Which GCP tool should you use to scale these tasks?",
            options: [
                "Use standard Pandas inside a Vertex AI Workbench instance.",
                "Use BigQuery to perform transformations and write results to a new table, or use Apache Spark on a serverless Dataproc cluster.",
                "Write a custom Python script that loads rows one by one from Cloud Storage.",
                "Use Vertex AI Feature Store to compute features on the fly during the training loop."
            ],
            answer_index: 1,
            explanation: "BigQuery and Dataproc Spark are designed for distributed data processing at scale, handling transformations on terabyte-scale tables efficiently."
        },
        {
            question: "You want to implement a feature pipeline that updates feature values every 5 minutes for online serving, and also registers daily snapshots for training. How should you design this on GCP?",
            options: [
                "Create a Dataflow streaming pipeline that writes features to Vertex AI Feature Store (legacy or next-gen) online store, and syncs to the offline store daily.",
                "Run a CRON job on a local Compute Engine VM that writes CSV files to Cloud Storage every 5 minutes.",
                "Configure a BigQuery scheduled query that runs every second to update online prediction endpoints directly.",
                "Manually run a Python script on Vertex Workbench every 5 minutes."
            ],
            answer_index: 0,
            explanation: "Vertex AI Feature Store supports dual-storage architectures: a low-latency online store (like Bigtable/Redis) for serving, and a columnar offline store (like BigQuery) for training."
        },
        {
            question: "A genomic research dataset of 1 PB contains tabular measurements. You need to train a custom TensorFlow model. Training requires random batch access to features. How should you structure your data pipeline?",
            options: [
                "Store the entire dataset in a single CSV file on Cloud Storage.",
                "Export data from BigQuery into TFRecord files partitioned by chromosome, and load them using `tf.data.Dataset.list_files` with parallel interleave and prefetching.",
                "Load the data into a Cloud SQL instance and query it using SQL joins in the training loop.",
                "Load all 1 PB of data into the RAM of a high-memory Vertex AI Workbench instance."
            ],
            answer_index: 1,
            explanation: "Partitioning TFRecords and streaming them with parallel interleave and prefetch maximizes read speeds, ensuring the GPU is not starved of data."
        }
    ],
    "model-development": [
        {
            question: "Which TensorFlow training API is recommended for building custom deep learning model architectures with custom layer structures?",
            options: [
                "Estimator API",
                "Keras functional or subclassing API",
                "BigQuery ML syntax",
                "AutoML Tabular API"
            ],
            answer_index: 1,
            explanation: "The Keras functional and subclassing APIs are the standard, modern interfaces for defining custom, complex neural network architectures in TensorFlow."
        },
        {
            question: "What is the primary goal of hyperparameter tuning in machine learning?",
            options: [
                "To optimize the parameter weights (slopes and intercepts) using gradient descent.",
                "To find the optimal configuration settings (like learning rate or batch size) that govern the training process.",
                "To automate data cleaning and missing value imputation.",
                "To compress model file sizes for mobile deployment."
            ],
            answer_index: 1,
            explanation: "Hyperparameters are external settings (e.g., learning rate, network depth) that are set before training. Tuning searches for the best combination of these settings."
        },
        {
            question: "Which Google Cloud service provides black-box optimization to help you tune hyperparameters across complex custom models?",
            options: [
                "Vertex AI Vizier",
                "Vertex AI Feature Store",
                "BigQuery ML Data Prep",
                "Cloud Dataflow"
            ],
            answer_index: 0,
            explanation: "Vertex AI Vizier is a managed optimization service for hyperparameter tuning, using Bayesian optimization to find the best configuration in fewer trials."
        },
        {
            question: "What metric should you monitor to detect if your deep neural network is overfitting during the training process?",
            options: [
                "Training Loss decreasing, while Validation Loss increases.",
                "Training Loss increasing, while Validation Loss decreases.",
                "Both Training and Validation Loss decreasing at the same rate.",
                "The training speed (steps per second) decreasing."
            ],
            answer_index: 0,
            explanation: "Overfitting occurs when a model memorizes training noise. This is marked by training loss continuing to fall while validation loss rises (indicating poor generalizability)."
        },
        {
            question: "How does the learning rate parameter impact gradient descent convergence?",
            options: [
                "Too small causes slow training; too large can cause the model to overshoot the minimum and diverge.",
                "Too small causes overfitting; too large causes underfitting.",
                "Learning rate has no impact on convergence speed.",
                "It determines the size of the input batches."
            ],
            answer_index: 0,
            explanation: "The learning rate scales step sizes. A low rate leads to slow training. A high rate can cause updates to overshoot optimal weights, leading to instability."
        },
        {
            question: "You want to train a model in BigQuery using SQL. You need to handle hyperparameter tuning automatically. How do you do this in BQML?",
            options: [
                "Write a custom Python loop in a Cloud Function to execute BQML statements.",
                "Use the `num_trials` option in the BQML `CREATE MODEL` statement configuration.",
                "Manually run 50 SQL queries with different parameters and track them in Excel.",
                "BQML does not support hyperparameter tuning."
            ],
            answer_index: 1,
            explanation: "BQML supports hyperparameter tuning natively. Setting `num_trials` in the `OPTIONS` block triggers an automated tuning loop using Vertex AI Vizier behind the scenes."
        },
        {
            question: "When training a custom PyTorch model on Vertex AI, how do you handle dependencies (like specific libraries or CUDA versions) in a reproducible way?",
            options: [
                "Run `pip install` commands manually in the terminal of the worker nodes after they boot.",
                "Package your training code into a custom Docker container, build it, push it to Artifact Registry, and run a Vertex Custom Job.",
                "Write code to download dependencies from a public Git repository on every training loop.",
                "You cannot use custom dependencies on Vertex AI."
            ],
            answer_index: 1,
            explanation: "Packaging code and dependencies into a custom Docker container pushed to Artifact Registry ensures identical environments across training runs."
        },
        {
            question: "You want to train a deep learning model on a TPU v4 cluster. The training loop is written in TensorFlow. What code adjustment must you implement to utilize the TPUs?",
            options: [
                "No adjustments; TPUs automatically accelerate any Python script.",
                "Instantiate a `tf.distribute.TPUStrategy` and compile your model and training loop within its scope.",
                "Convert all TensorFlow code into standard SQL queries.",
                "Run training on a standard single-node Compute Engine instance."
            ],
            answer_index: 1,
            explanation: "To train on TPUs, you must initialize connection to the TPU cluster and wrap model creation and compilation in the `TPUStrategy` scope."
        },
        {
            question: "You are training a large language model from scratch. You notice that after a few thousand steps, the gradients become extremely large (NaN values) and loss explodes. How do you resolve this?",
            options: [
                "Disable all dropout layers.",
                "Implement gradient clipping in your optimizer configuration, and check for weight initialization scaling.",
                "Decrease the training batch size to 1.",
                "Remove all normalization layers (like LayerNorm)."
            ],
            answer_index: 1,
            explanation: "Gradient clipping scales down gradients if their norm exceeds a threshold, preventing numerical explosion (NaNs) during training updates."
        },
        {
            question: "You are building a time-series forecasting model for inventory. You have data from 2020 to 2025. How should you split your data to evaluate the model's real-world forecasting ability accurately?",
            options: [
                "Randomly assign 80% of rows to training and 20% to testing.",
                "Use a time-based split: train on data from 2020-2024, and validate/test on data from 2025 to simulate forecasting future values.",
                "Use K-fold cross-validation, randomly shuffling the datasets on every fold.",
                "Train on the odd months and test on the even months."
            ],
            answer_index: 1,
            explanation: "Time-series data has temporal dependencies. Shuffling data causes lookahead bias. Splitting chronologically (train on past, test on future) represents real-world performance."
        }
    ],
    "ml-pipeline-orchestration": [
        {
            question: "Which GCP service is the primary tool used to orchestrate serverless ML workflows, build reproducible pipelines, and track metadata?",
            options: [
                "Vertex AI Pipelines",
                "Cloud Dataflow",
                "Cloud Run",
                "Vertex AI Model Registry"
            ],
            answer_index: 0,
            explanation: "Vertex AI Pipelines allows you to orchestrate ML workflows using Kubeflow Pipelines (KFP) or TFX, tracking metadata and artifacts automatically."
        },
        {
            question: "What is the primary purpose of the Vertex AI Model Registry?",
            options: [
                "To store raw training datasets.",
                "To provide a central repository to manage, version, and share trained machine learning models.",
                "To run hyperparameter tuning jobs.",
                "To write feature engineering scripts."
            ],
            answer_index: 1,
            explanation: "Vertex AI Model Registry acts as a central repository for tracking model versions, managing deployments, and facilitating model lineage audits."
        },
        {
            question: "In Vertex AI Pipelines, what is an 'Artifact'?",
            options: [
                "A script containing Python code.",
                "An output generated by a pipeline step, such as a dataset, a trained model file, or an evaluation metric sheet.",
                "A hardware component like a GPU.",
                "A user profile in local storage."
            ],
            answer_index: 1,
            explanation: "Artifacts are the inputs/outputs passed between pipeline components (e.g., datasets, metrics, models) tracked by Vertex AI Metadata."
        },
        {
            question: "What is the benefit of caching in Vertex AI Pipelines?",
            options: [
                "It compresses model file sizes.",
                "It skips execution of a pipeline step if its inputs and code have not changed, reducing training costs and time.",
                "It saves user profiles in the browser cache.",
                "It accelerates web page load times."
            ],
            answer_index: 1,
            explanation: "Caching checks if a component's inputs, parameters, and container image match a previous run. If so, it reuses the outputs, skipping execution to save cost."
        },
        {
            question: "Which SDK can you use to define serverless Vertex AI Pipelines using standard Python functions and YAML configurations?",
            options: [
                "Kubeflow Pipelines (KFP) SDK or TFX SDK",
                "TensorFlow API",
                "BigQuery SQL Client",
                "Google Cloud Storage Client"
            ],
            answer_index: 0,
            explanation: "KFP and TFX are the two open-source frameworks supported by Vertex AI Pipelines to author and compile pipeline definitions in Python."
        },
        {
            question: "You want to automate your ML pipeline to run every Monday at 8 AM. How should you schedule this on Google Cloud?",
            options: [
                "Leave a Vertex AI Workbench notebook running a loop with `time.sleep()`.",
                "Set up a Cloud Scheduler job that triggers a Cloud Function to call the Vertex AI Pipeline REST API.",
                "Write a SQL query in BigQuery ML with a sleep interval.",
                "Use local CRON jobs on your personal computer."
            ],
            answer_index: 1,
            explanation: "Cloud Scheduler paired with a Cloud Function or Pub/Sub is the serverless way to schedule pipeline execution intervals in production."
        },
        {
            question: "You want to implement CI/CD for your ML pipelines. When a developer pushes new training code to GitHub, the pipeline should compile, run tests, and register the model. What tools should you combine?",
            options: [
                "GitHub Actions (or Cloud Build) to build container images, run tests, compile the pipeline to JSON/YAML, and deploy it to Cloud Storage.",
                "BigQuery scheduled queries triggering local Python notebooks.",
                "AutoML Tabular paired with Cloud SQL triggers.",
                "Vertex AI Feature Store with manual deployments."
            ],
            answer_index: 0,
            explanation: "CI/CD pipelines built in Cloud Build or GitHub Actions automate testing, container building, and pipeline deployment upon code changes."
        },
        {
            question: "During a audit, you are asked to prove exactly which dataset and hyperparameters were used to train a specific model version deployed in production. How do you find this?",
            options: [
                "Search the developer's Slack logs for the model name.",
                "Open Vertex AI Metadata, find the model artifact, and trace its lineage graph back to the training step inputs.",
                "Re-run all training pipelines until you find a matching weight matrix.",
                "Look at the file creation date in Cloud Storage."
            ],
            answer_index: 1,
            explanation: "Vertex AI Metadata tracks lineage graphs, allowing you to trace a deployed model version back through pipeline runs to retrieve its exact training parameters and source data."
        },
        {
            question: "You are designing a Kubeflow pipeline step that evaluates a model's metrics against a threshold. If accuracy is higher than the current champion, it should register the model. How should you write this component?",
            options: [
                "Write a standard python-based KFP component that downloads metrics, queries Vertex Model Registry for the active champion, compares them, and conditionally calls the Model Upload API.",
                "Write a SQL query that deletes the old model from Cloud Storage.",
                "AutoML does this automatically and cannot be customized.",
                "Write a bash script that runs on the model serving endpoint."
            ],
            answer_index: 0,
            explanation: "Conditional execution in pipelines (using KFP conditional blocks) allows comparing new model metrics with active champion metrics before registering/deploying."
        },
        {
            question: "Your team wants to deploy a TFX (TensorFlow Extended) pipeline. The pipeline needs to perform data validation (check for anomalies) and model validation (check for bias) before exporting. Which components should you include?",
            options: [
                "DataValidator, ModelTrainer, ModelDeployer",
                "ExampleGen, StatisticsGen, SchemaGen, ExampleValidator, Evaluator, and Pusher",
                "AutoML Tabular, Cloud Dataflow, Vertex Endpoints",
                "BigQuery ML, Cloud Composer, Cloud Storage"
            ],
            answer_index: 1,
            explanation: "Standard TFX components handle validation: `ExampleValidator` checks input data anomalies, and `Evaluator` verifies performance and bias thresholds before the `Pusher` deploys."
        }
    ],
    "serving-monitoring-ethics": [
        {
            question: "Which Vertex AI resource is used to host models and serve low-latency online predictions via REST/gRPC endpoints?",
            options: [
                "Vertex AI Endpoint",
                "Vertex AI Pipelines",
                "Cloud Storage Bucket",
                "Artifact Registry"
            ],
            answer_index: 0,
            explanation: "Vertex AI Endpoints host model artifacts and serve online predictions with auto-scaling and traffic splitting features."
        },
        {
            question: "What is the primary difference between Online Prediction and Batch Prediction?",
            options: [
                "Online prediction handles high-throughput historical data; Batch prediction is for single, low-latency requests.",
                "Online prediction serves real-time requests with low latency; Batch prediction processes large volumes of data asynchronously.",
                "Online prediction requires SQL; Batch prediction requires TensorFlow.",
                "Online prediction is free, while Batch prediction is paid."
            ],
            answer_index: 1,
            explanation: "Online serving targets real-time, low-latency app requests. Batch serving handles scheduled, high-volume predictions (e.g., scoring millions of profiles nightly)."
        },
        {
            question: "Which Google Cloud feature allows you to explain why a model made a specific prediction by returning feature attributions (e.g., Integrated Gradients)?",
            options: [
                "Vertex Explainable AI",
                "Vertex AI Vizier",
                "Cloud Logging",
                "BigQuery ML Explain"
            ],
            answer_index: 0,
            explanation: "Vertex Explainable AI integrates with online/batch serving to provide feature attribution scores, showing how much each input feature contributed to the output."
        },
        {
            question: "What is 'Prediction Drift' in production machine learning systems?",
            options: [
                "When the model's serving latency increases due to server load.",
                "When the statistical distribution of the model's predicted outputs shifts over time compared to the training distribution.",
                "When the model file size grows due to weight changes.",
                "When predictions are returned out of order."
            ],
            answer_index: 1,
            explanation: "Prediction drift monitoring tracks changes in the distribution of predicted classes, which is often an early indicator of underlying data shift."
        },
        {
            question: "What is the role of Vertex AI Model Monitoring?",
            options: [
                "To monitor the CPU and RAM usage of the serving VMs.",
                "To detect feature skew and drift between training and production serving data, triggering alerts.",
                "To automatically update the weights of models using reinforcement learning.",
                "To count the number of users logged into the application."
            ],
            answer_index: 1,
            explanation: "Vertex AI Model Monitoring analyzes request/response logs to identify statistical drift (shift over time) and training-serving skew (mismatches between train/serving data)."
        },
        {
            question: "A company wants to update their production recommendation model. To test the new model safely, they route 95% of traffic to the active model and 5% to the candidate. What is this strategy?",
            options: [
                "Shadow Deployment",
                "Canary Deployment / Traffic Splitting",
                "Batch Prediction",
                "A/B Testing under strict isolation"
            ],
            answer_index: 1,
            explanation: "Canary routing splits traffic on the same endpoint, sending a small percentage to the new model version to monitor for errors before a full rollout."
        },
        {
            question: "You deploy a custom image classification model on Vertex AI. The container logs show out-of-memory (OOM) errors during peak traffic. How do you resolve this?",
            options: [
                "Change the endpoint scaling settings to increase the minimum node count, or configure the deployment with machine types that have more RAM/GPUs.",
                "Convert the model to a linear regression model.",
                "Move the images to a SQL database.",
                "Disable model monitoring."
            ],
            answer_index: 0,
            explanation: "OOM errors mean the container size or batch size exceeds VM memory. Scaling up (larger machine types) or adjusting concurrency limits fixes memory issues."
        },
        {
            question: "You want to evaluate your credit scoring model for demographic fairness. Which practice is best to prevent historical biases from propagating through your model?",
            options: [
                "Simply delete the demographic features from the dataset, assuming this completely hides the attributes from the model.",
                "Use Vertex Explainable AI and tools like the What-If Tool to analyze slice-level performance, checking if proxy variables replicate bias.",
                "Add L1 regularization to drive the demographic parameter weights to zero.",
                "Evaluate the model only on overall accuracy."
            ],
            answer_index: 1,
            explanation: "Removing demographic fields is often insufficient because other features act as proxies (e.g., zip code or income). Opaque bias must be analyzed via explainability and slicing tools."
        },
        {
            question: "You set up Vertex AI Model Monitoring for an online endpoint. You want to detect training-serving skew. What inputs must you provide to the monitoring service?",
            options: [
                "Only the endpoint REST address.",
                "The production request log database and the baseline dataset (the training dataset used to train the model).",
                "The model source code in GitHub.",
                "The billing account ID and server regions."
            ],
            answer_index: 1,
            explanation: "To calculate skew, the system needs to compare the statistical properties of incoming production requests with the baseline training dataset distribution."
        },
        {
            question: "You want to serve predictions for a tabular model. The features are sensitive financial data. The business requires that predictions are auditable and all features explainable. How do you configure deployment?",
            options: [
                "Perform batch prediction only and store results in a password-secured PDF.",
                "Deploy the model to a private Vertex AI Endpoint, configure Vertex Explainable AI with tabular attributions (SHAP), and write prediction logs to BigQuery for audits.",
                "Deploy the model on an edge device using TensorFlow Lite.",
                "Encrypt the model weights and disable prediction logging."
            ],
            answer_index: 1,
            explanation: "Pairing private endpoints (restricting network access), SHAP explainability (quantifying feature contributions), and logging requests to BigQuery meets auditing and security demands."
        }
    ]
};

/**
 * Fetches quiz questions dynamically from Google AI Studio Gemini API.
 * Uses structured JSON output mode to guarantee correct schema.
 * Falls back to offline database if API key is missing or request fails.
 * 
 * @param {string} categoryId - The ID of the category (e.g. 'ml-problem-framing')
 * @returns {Promise<Array>} Array of 10 question objects.
 */
async function fetchQuizQuestions(categoryId) {
    const apiKey = localStorage.getItem("gemini_api_key");
    const modelName = localStorage.getItem("gemini_model_name") || "gemini-2.5-flash";
    
    const category = getActiveCategories().find(c => c.id === categoryId);
    const categoryName = category ? category.name : categoryId;

    // Check if API key is configured. If not, log and fall back to local mock data.
    if (!apiKey || apiKey.trim() === "") {
        console.warn("No Gemini API key found. Launching Quiz in Offline Mock Mode.");
        return getOfflineQuestions(categoryId);
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    // Dynamic prompt based on active tab
    const isGcpCert = activeTab === "gcp-cert";
    const promptText = isGcpCert
    ? `
Generate a challenging and highly educational multiple-choice quiz on the Google Cloud Professional Machine Learning Engineer exam domain: "${categoryName}".
Target Audience: Professionals preparing to pass the Google Cloud PMLE certification.

Generate exactly 10 questions.
For each question:
- Make it technically accurate, scenario-oriented (emulating the GCP certification style), and highly relevant to Google Cloud services (such as Vertex AI, BigQuery ML, Dataflow, Dataproc, Vizier, and explainability/Responsible AI guidelines).
- Enforce an increasing gradient of difficulty:
  - Questions 1 to 3 MUST be Conceptual & Fundamental (Easy difficulty, testing terms and basic services).
  - Questions 4 to 6 MUST be Application & Configuration (Medium difficulty, testing setting selections, API calls, and parameter choices).
  - Questions 7 to 8 MUST be Advanced Troubleshooting & Ingestion (Hard difficulty, testing error resolutions, architectural optimizations, and pipeline setups).
  - Questions 9 to 10 MUST be Expert-level Scenario Case Studies (Very Hard difficulty, providing high-stakes corporate scenarios requiring trade-off choices between cost, latency, security, and accuracy).
- Provide exactly 4 options. Make the wrong options look highly plausible but technically incorrect.
- Provide the 0-based index of the correct answer in the options array.
- Provide a brief, high-impact explanation of why the correct option is correct (under 30 words), referencing GCP best practices.

You MUST output your response strictly conforming to the following JSON structure:
{
    "questions": [
        {
            "question": "The question string",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer_index": 0,
            "explanation": "Brief explanation statement."
        }
    ]
}
Do not include any introductory text, markdown code blocks, or explanations outside the JSON block. Ensure valid JSON encoding.
`
    : `
Generate a challenging and highly educational multiple-choice quiz on the AI topic: "${categoryName}".
Target Audience: New graduates and working professionals aiming for AI/ML mastery.

Generate exactly 10 questions.
For each question:
- Make it technically accurate, conceptually rich, and highly relevant to the domain.
- Enforce an increasing gradient of difficulty:
  - Questions 1 to 3 MUST be Conceptual & Fundamental (Easy difficulty, testing terms and basic concepts).
  - Questions 4 to 6 MUST be Application & Understanding (Medium difficulty, testing applied knowledge and reasoning).
  - Questions 7 to 8 MUST be Advanced Analysis (Hard difficulty, testing deeper technical understanding and trade-offs).
  - Questions 9 to 10 MUST be Expert-level Scenario Case Studies (Very Hard difficulty, providing real-world scenarios requiring nuanced technical judgment).
- Provide exactly 4 options. Make the wrong options look highly plausible but technically incorrect.
- Provide the 0-based index of the correct answer in the options array.
- Provide a brief, high-impact explanation of why the correct option is correct (under 30 words).

You MUST output your response strictly conforming to the following JSON structure:
{
    "questions": [
        {
            "question": "The question string",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer_index": 0,
            "explanation": "Brief explanation statement."
        }
    ]
}
Do not include any introductory text, markdown code blocks, or explanations outside the JSON block. Ensure valid JSON encoding.
`;

    // Define JSON Schema for Structured Outputs
    const requestPayload = {
        contents: [
            {
                parts: [
                    { text: promptText }
                ]
            }
        ],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    questions: {
                        type: "ARRAY",
                        description: "List of 10 trivia questions",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: { type: "STRING" },
                                options: {
                                    type: "ARRAY",
                                    items: { type: "STRING" }
                                },
                                answer_index: { type: "INTEGER" },
                                explanation: { type: "STRING" }
                            },
                            required: ["question", "options", "answer_index", "explanation"]
                        }
                    }
                },
                required: ["questions"]
            }
        }
    };

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestPayload)
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`Gemini API Error: Status ${response.status}. Details: ${errorMsg}`);
        }

        const data = await response.json();
        
        // Extract content text
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!responseText) {
            throw new Error("Empty content returned from Gemini model.");
        }

        const parsedData = JSON.parse(responseText);
        
        if (!parsedData.questions || !Array.isArray(parsedData.questions) || parsedData.questions.length === 0) {
            throw new Error("Invalid output format: 'questions' array is missing or empty.");
        }

        // Validate and clean each question object
        const validatedQuestions = parsedData.questions.map((q, idx) => {
            return {
                question: q.question || `Question ${idx + 1}`,
                options: (Array.isArray(q.options) && q.options.length >= 2) ? q.options.slice(0, 4) : ["Option A", "Option B", "Option C", "Option D"],
                answer_index: (typeof q.answer_index === "number" && q.answer_index >= 0 && q.answer_index < 4) ? q.answer_index : 0,
                explanation: q.explanation || "No explanation provided."
            };
        });

        // Ensure we always return exactly 10 questions (pad or slice if necessary)
        if (validatedQuestions.length < 10) {
            const fallbacks = getOfflineQuestions(categoryId);
            while (validatedQuestions.length < 10) {
                validatedQuestions.push(fallbacks[validatedQuestions.length]);
            }
        }
        
        return validatedQuestions.slice(0, 10);

    } catch (error) {
        console.error("Failed to fetch questions from Gemini API:", error);
        console.warn("Falling back to local offline mock questions.");
        return getOfflineQuestions(categoryId);
    }
}

/**
 * Returns a slice/copy of 10 offline questions for a category.
 * 
 * @param {string} categoryId 
 * @returns {Array} Array of 10 question objects.
 */
function getOfflineQuestions(categoryId) {
    const list = OFFLINE_QUIZ_DATA[categoryId] || AI_FLUENCY_OFFLINE_DATA[categoryId] || OFFLINE_QUIZ_DATA["ml-problem-framing"];
    // Return a deep copy so state isn't modified
    return JSON.parse(JSON.stringify(list));
}
