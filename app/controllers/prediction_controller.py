from flask import request
from flask_restful import Resource
from app.services.model_service import ModelService
from app.services.file_service import FileService
from app.services.gemini_service import GeminiService
from app.services.file_service import FileService
import traceback
import os

class Welcome(Resource):
    def welcome(self):
        return {'Welcome to Backend of Skin Disease Detection For Adult Project'}, 200

class PredictResource(Resource):
    def __init__(self):
        self.model_service = ModelService()
        self.file_service = FileService()
        self.gemini_service = GeminiService()


    def post(self):
        """Handle image upload and prediction"""
        filepath = None
        try:
            if 'file' not in request.files:
                return {'error': 'No file provided'}, 400
            
            file = request.files['file']
            if not file or file.filename == '':
                return {'error': 'Empty file provided'}, 400
                
            # Validate file type before saving
            if not self.file_service.allowed_file(file.filename):
                return {'error': 'Invalid file type. Allowed types: png, jpg, jpeg'}, 400
            
            # Save the uploaded file
            filepath, unique_filename = self.file_service.save_file(file)
            
            # Get prediction from model
            prediction = self.model_service.predict(filepath)

            mime_type = self.file_service.get_mime_type(file.filename)

            # Validate MIME type
            valid_mime_types = {'image/jpeg', 'image/png', 'image/jpg'}
            if not mime_type or mime_type not in valid_mime_types:
                return {'error': 'Invalid file type. Allowed types: png, jpg, jpeg'}, 400
            
            # Reset file pointer before reading the stream
            file.seek(0)
            # Read file stream
            image_data = file.stream.read()
            if not image_data:
                return {'error': 'File is empty or corrupted', 'success': False}, 400
            
            response = self.gemini_service.check_skin_disease(image_data, mime_type)

            self.file_service.remove_file(filepath)
            # Combine results
            result = {
                'success': True,
                'is_skin_disease': True if response == 'SKIN_RELATED' else False,
                'image_id': unique_filename,
                **prediction
            }
            
            return result, 200
            
        except ValueError as e:
            print(f"Value error in prediction: {str(e)}")
            return {'error': str(e), 'success': False}, 400
        except Exception as e:
            print(f"Error in prediction: {str(e)}")
            traceback.print_exc()
            return {'error': str(e), 'success': False}, 500
        finally:
            # Clean up temporary file if needed
            if filepath and os.path.exists(filepath) and 'unique_filename' not in locals():
                try:
                    os.remove(filepath)
                    print(f"Cleaned up temporary file: {filepath}")
                except:
                    pass
class ResultResource(Resource):
    def get(self, image_id):
        """Retrieve prediction result for a specific image"""
        # In a real application, you would fetch this from a database
        # For this example, we'll return a mock response
        return {
            'image_id': image_id,
            'disease': 'melanoma',
            'confidence': 0.95
        }, 200 