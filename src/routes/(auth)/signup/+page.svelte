<script lang="ts">
	import { signUp } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { toast } from '$lib/toast';

	// Form state
	let formData = {
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	let loading = false;
	let errors: Record<string, string> = {};

	// Validation functions
	function validateEmail(email: string): string | null {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) return 'Email is required';
		if (!emailRegex.test(email)) return 'Please enter a valid email address';
		return null;
	}

	function validatePassword(password: string): string | null {
		if (!password) return 'Password is required';
		if (password.length < 8) return 'Password must be at least 8 characters long';
		if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
		if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
		if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
		return null;
	}

	function validateName(name: string): string | null {
		if (!name) return 'Name is required';
		if (name.length < 2) return 'Name must be at least 2 characters long';
		if (name.length > 50) return 'Name must be less than 50 characters';
		return null;
	}

	function validateConfirmPassword(password: string, confirmPassword: string): string | null {
		if (!confirmPassword) return 'Please confirm your password';
		if (password !== confirmPassword) return 'Passwords do not match';
		return null;
	}

	// Real-time validation
	function validateField(field: string, value: string) {
		switch (field) {
			case 'name':
				errors.name = validateName(value) || '';
				break;
			case 'email':
				errors.email = validateEmail(value) || '';
				break;
			case 'password':
				errors.password = validatePassword(value) || '';
				// Re-validate confirm password if it exists
				if (formData.confirmPassword) {
					errors.confirmPassword = validateConfirmPassword(value, formData.confirmPassword) || '';
				}
				break;
			case 'confirmPassword':
				errors.confirmPassword = validateConfirmPassword(formData.password, value) || '';
				break;
		}
		errors = { ...errors }; // Trigger reactivity
	}

	function validateForm(): boolean {
		const nameError = validateName(formData.name);
		const emailError = validateEmail(formData.email);
		const passwordError = validatePassword(formData.password);
		const confirmPasswordError = validateConfirmPassword(
			formData.password,
			formData.confirmPassword
		);

		errors = {
			name: nameError || '',
			email: emailError || '',
			password: passwordError || '',
			confirmPassword: confirmPasswordError || ''
		};

		return !nameError && !emailError && !passwordError && !confirmPasswordError;
	}

	async function handleSignup() {
		if (!validateForm()) {
			toast({
				kind: 'error',
				title: 'Validation Error',
				subtitle: 'Please fix the errors below',
				showTimestamp: true,
				hideCloseButton: false
			});
			return;
		}

		loading = true;

		try {
			const result = await signUp.email({
				name: formData.name,
				email: formData.email,
				password: formData.password
			});

			if (result.error) {
				// Handle specific error types
				if (result.error.message?.includes('email')) {
					errors.email = 'This email is already registered';
					errors = { ...errors };
				}

				toast({
					kind: 'error',
					title: 'Registration Failed',
					subtitle: result.error.message || 'Registration failed',
					showTimestamp: true,
					hideCloseButton: false
				});
			} else {
				toast({
					kind: 'success',
					title: 'Account Created!',
					subtitle: 'Welcome! Your account has been created successfully.',
					showTimestamp: true,
					hideCloseButton: false
				});
				goto('/leaderboard');
			}
		} catch (error) {
			console.error('Signup error:', error);
			toast({
				kind: 'error',
				title: 'Unexpected Error',
				subtitle: 'An unexpected error occurred',
				showTimestamp: true,
				hideCloseButton: false
			});
		} finally {
			loading = false;
		}
	}

	// Check if form is valid for submit button
	$: isFormValid =
		formData.name &&
		formData.email &&
		formData.password &&
		formData.confirmPassword &&
		!Object.values(errors).some((error) => error);
</script>

<svelte:head>
	<title>Sign Up - Tiro</title>
</svelte:head>

<div class="auth-frame">
	<div class="signup-form-wrapper">
		<h1>Create Account</h1>
		<p class="subtitle">Join us to start tracking your tournament scores</p>

		<form on:submit|preventDefault={handleSignup}>
			<!-- Name Field -->
			<div class="form-group">
				<label for="name">Full Name</label>
				<input
					id="name"
					type="text"
					bind:value={formData.name}
					on:blur={() => validateField('name', formData.name)}
					placeholder="Enter your full name"
					required
					disabled={loading}
					class:error={errors.name}
				/>
				{#if errors.name}
					<span class="error-message">{errors.name}</span>
				{/if}
			</div>

			<!-- Email Field -->
			<div class="form-group">
				<label for="email">Email Address</label>
				<input
					id="email"
					type="email"
					bind:value={formData.email}
					on:blur={() => validateField('email', formData.email)}
					placeholder="Enter your email"
					required
					disabled={loading}
					class:error={errors.email}
				/>
				{#if errors.email}
					<span class="error-message">{errors.email}</span>
				{/if}
			</div>

			<!-- Password Field -->
			<div class="form-group">
				<label for="password">Password</label>
				<input
					id="password"
					type="password"
					bind:value={formData.password}
					on:blur={() => validateField('password', formData.password)}
					placeholder="Create a password"
					required
					disabled={loading}
					class:error={errors.password}
				/>
				{#if errors.password}
					<span class="error-message">{errors.password}</span>
				{:else}
					<span class="help-text">
						Password must be at least 8 characters with uppercase, lowercase, and numbers
					</span>
				{/if}
			</div>

			<!-- Confirm Password Field -->
			<div class="form-group">
				<label for="confirmPassword">Confirm Password</label>
				<input
					id="confirmPassword"
					type="password"
					bind:value={formData.confirmPassword}
					on:blur={() => validateField('confirmPassword', formData.confirmPassword)}
					placeholder="Confirm your password"
					required
					disabled={loading}
					class:error={errors.confirmPassword}
				/>
				{#if errors.confirmPassword}
					<span class="error-message">{errors.confirmPassword}</span>
				{/if}
			</div>

			<!-- Submit Button -->
			<button type="submit" disabled={loading || !isFormValid} class="submit-btn">
				{loading ? 'Creating Account...' : 'Create Account'}
			</button>
		</form>

		<div class="login-link">
			<p>Already have an account? <a href="/login">Sign in here</a></p>
		</div>
	</div>
</div>

<style>
	.auth-frame {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 2rem;
	}

	.signup-form-wrapper {
		width: 100%;
		max-width: 400px;
		background: white;
		padding: 2.5rem;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	h1 {
		text-align: center;
		margin-bottom: 0.5rem;
		color: #1a1a1a;
	}

	.subtitle {
		text-align: center;
		color: #666;
		margin-bottom: 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: #333;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #e1e5e9;
		border-radius: 6px;
		font-size: 1rem;
		transition: border-color 0.2s ease;
	}

	input:focus {
		outline: none;
		border-color: #007bff;
	}

	input.error {
		border-color: #dc3545;
	}

	input:disabled {
		background-color: #f8f9fa;
		cursor: not-allowed;
	}

	.error-message {
		display: block;
		margin-top: 0.25rem;
		color: #dc3545;
		font-size: 0.875rem;
	}

	.help-text {
		display: block;
		margin-top: 0.25rem;
		color: #6c757d;
		font-size: 0.875rem;
	}

	.submit-btn {
		width: 100%;
		padding: 0.875rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.submit-btn:hover:not(:disabled) {
		background-color: #0056b3;
	}

	.submit-btn:disabled {
		background-color: #6c757d;
		cursor: not-allowed;
	}

	.login-link {
		text-align: center;
		margin-top: 1.5rem;
		padding-top: 1.5rem;
		border-top: 1px solid #e1e5e9;
	}

	.login-link a {
		color: #007bff;
		text-decoration: none;
	}

	.login-link a:hover {
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		.signup-form-wrapper {
			padding: 1.5rem;
		}
	}
</style>
