// Closing a WebView must wait for committed IndexedDB transactions, not just UI updates.
export class WriteBarrier {
    pending = new Set();
    latest = new Map();
    errors = new Map();
    track(key, operation) {
        const token = {};
        this.latest.set(key, token);
        const task = Promise.resolve(operation).then(value => {
            if (this.latest.get(key) === token) this.errors.delete(key);
            return value;
        }, error => {
            if (this.latest.get(key) === token) this.errors.set(key, error);
            throw error;
        }).finally(() => {
            this.pending.delete(task);
            if (this.latest.get(key) === token) this.latest.delete(key);
        });
        this.pending.add(task);
        return task;
    }
    async drain() {
        while (this.pending.size) await Promise.allSettled([...this.pending]);
        if (this.errors.size) throw new Error('メモの保存に失敗したため画面を閉じませんでした。空き容量を確認して再度保存してください');
    }
}
