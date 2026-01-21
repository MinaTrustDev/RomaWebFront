export class GetProductBySlugRequestMapper {
    static toRequest(slug: string, branchId?: number): string {
        const params = new URLSearchParams();
        params.append('slug', slug);
        if (branchId) {
            params.append('branch_id', branchId.toString());
        }
        return params.toString();
    }
}