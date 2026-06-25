<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreNewsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title'        => ['required', 'string', 'max:255'],
            'content_json' => ['required', 'json'],
            'content_html' => ['required', 'string'],
            'category_id'  => ['required', 'integer', 'exists:categories,id'],
            'cover_image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp', 'max:2048']
        ];
    }

    public function messages(): array
    {
        return [
            'category_id.required' => 'É obrigatório selecionar uma categoria para a notícia.',
            'category_id.exists'   => 'A categoria selecionada não é válida.',
        ];
    }
}
