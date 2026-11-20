<script lang="ts">
	import { Badge } from '#lib/components/ui/badge/index.ts';

	type Props = {
		active: boolean;
	};

	let { active }: Props = $props();
</script>

<Badge variant={active ? 'default' : 'outline'}>{active ? 'Sì' : 'No'}</Badge>
