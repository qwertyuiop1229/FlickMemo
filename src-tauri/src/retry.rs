use std::time::{Duration, Instant};
pub struct RetryGate {
    owner: String,
    delay: Duration,
    until: Option<Instant>,
}
impl RetryGate {
    pub fn new() -> Self {
        Self {
            owner: String::new(),
            delay: Duration::from_secs(60),
            until: None,
        }
    }
    pub fn owner(&mut self, owner: &str) {
        if self.owner != owner {
            self.owner = owner.into();
            self.success();
        }
    }
    pub fn remaining(&self, now: Instant) -> Option<Duration> {
        self.until.and_then(|until| {
            let wait = until.saturating_duration_since(now);
            if wait.is_zero() {
                None
            } else {
                Some(wait)
            }
        })
    }
    pub fn fail(&mut self, now: Instant) {
        self.until = Some(now + self.delay);
        self.delay = (self.delay * 2).min(Duration::from_secs(15 * 60));
    }
    pub fn success(&mut self) {
        self.delay = Duration::from_secs(60);
        self.until = None;
    }
}
#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn clipboard_notifications_cannot_bypass_network_backoff() {
        let mut gate = RetryGate::new();
        gate.owner("a");
        let now = Instant::now();
        gate.fail(now);
        for _ in 0..1000 {
            assert_eq!(gate.remaining(now), Some(Duration::from_secs(60)));
        }
        assert!(gate.remaining(now + Duration::from_secs(61)).is_none());
        gate.fail(now);
        assert_eq!(gate.remaining(now), Some(Duration::from_secs(120)));
        gate.owner("b");
        assert!(gate.remaining(now).is_none());
        gate.fail(now);
        assert_eq!(gate.remaining(now), Some(Duration::from_secs(60)));
    }
}
